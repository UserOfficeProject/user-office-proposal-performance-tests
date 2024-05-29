import { check, fail } from 'k6';

import { getInitData } from '../../support/initData';
import {
  Template as TemplateType,
  ClientApi,
  TemplateQueryResponse,
} from '../../utils/sharedType';

export class Template {
  private initData = getInitData();
  constructor(private apiClient: ClientApi) {}

  createTemplate(): TemplateType {
    const mutation = `
    mutation CreateTemplate($groupId: TemplateGroupId!, $name: String!, $description: String) {
        createTemplate(groupId: $groupId, name: $name, description: $description) {
          templateId
          name
          description
          steps {
            topic {
              id
              templateId
              title
              isEnabled
              sortOrder
            }
          }
        }
      }`;

    const variables = {
      ...this.initData?.template,
    };

    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );
    const responseData = response.json() as TemplateQueryResponse;
    const checkValue = check(response, {
      'Template for call test created': (r) =>
        r.status === 200 && !!responseData.data?.createTemplate?.templateId,
    }).valueOf();

    if (!checkValue) {
      fail(
        'Performance test template could not be created aborting test, Executing class Template.createTemplate'
      );
    }

    return responseData.data?.createTemplate as TemplateType;
  }

  deleteTemplate(deleteTemplateId: number): number {
    const mutation = `
            mutation DeleteTemplate($templateId: Int!) {
                deleteTemplate(templateId: $templateId) {
                templateId
                name
                groupId
                steps {
                  topic {
                    id
                    templateId
                    title
                    isEnabled
                    sortOrder
                  }
                }
                }
            }`;

    const variables = {
      templateId: deleteTemplateId,
    };
    const response = this.apiClient(
      JSON.stringify({ query: mutation, variables })
    );
    const responseData = response.json() as TemplateQueryResponse;

    if (
      !check(response, {
        'Template deleted': (r) =>
          r.status === 200 && !!responseData.data.deleteTemplate.templateId,
      })
    ) {
      console.error('Fail to delete template', response.error);
    }

    return deleteTemplateId;
  }
}
