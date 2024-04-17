package sql

import (
	dbsql "database/sql"
	"fmt"

	_ "github.com/godror/godror"
	_ "github.com/lib/pq"
	"go.k6.io/k6/js/modules"
)

func init() {
	modules.Register("k6/x/sql", new(RootModule))
}


type RootModule struct{}


type SQL struct {
	vu modules.VU
}


var (
	_ modules.Module   = &RootModule{}
	_ modules.Instance = &SQL{}
)


func (*RootModule) NewModuleInstance(vu modules.VU) modules.Instance {
	return &SQL{vu: vu}
}


func (sql *SQL) Exports() modules.Exports {
	return modules.Exports{Default: sql}
}


type KeyValue map[string]interface{}

func contains(s []string, e string) bool {
    for _, a := range s {
        if a == e {
            return true
        }
    }
    return false
}


func (*SQL) Open(connectorType string, connectionString string) (*dbsql.DB, error) {
	connectorTypes := []string{"postgres", "oracle"}
	if !contains(connectorTypes, connectorType) {
		return nil, fmt.Errorf("database %s is not supported", connectorType)
	}

    if connectorType == "oracle" {
		connectorType = "godror"
	}
	db, err := dbsql.Open(connectorType, connectionString)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func (*SQL) Query(db *dbsql.DB, query string, args ...interface{}) ([]KeyValue, error) {
	rows, err := db.Query(query, args...)
	if err != nil {
		return nil, err
	}

	defer func() {
		_ = rows.Close()
	}()
	if rows.Err() != nil {
		return nil, rows.Err()
	}

	cols, err := rows.Columns()
	if err != nil {
		return nil, err
	}

	values := make([]interface{}, len(cols))
	valuePtrs := make([]interface{}, len(cols))
	result := make([]KeyValue, 0)

	for rows.Next() {
		for i := range values {
			valuePtrs[i] = &values[i]
		}

		err = rows.Scan(valuePtrs...)
		if err != nil {
			return nil, err
		}

		data := make(KeyValue, len(cols))
		for i, colName := range cols {
			data[colName] = *valuePtrs[i].(*interface{})
		}
		result = append(result, data)
	}

	return result, nil
}