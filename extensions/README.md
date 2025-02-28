---
title: Extensions readme
tags:
 - markdown
---
# Extensions

This directory contains [Go](https://go.dev/) extensions which extend K6 using [XK6](https://github.com/grafana/xk6) to send logs to OpenSearch or Logging to the console.

* **`user-office-proposal-performance-tests/xk6-output-logger`:** This extension provides real-time logging of performance metrics directly to the console.
* **`user-office-proposal-performance-tests/xk6-output-opensearch`:** This extension enables the streaming of performance metrics to OpenSearch.

## Making Updates to Extensions

1.  **Clone the Repository:**
    * **For `xk6-output-logger`:**
        ```bash
        git clone [https://github.com/UserOfficeProject/user-office-proposal-performance-tests](https://github.com/UserOfficeProject/user-office-proposal-performance-tests)
        cd user-office-proposal-performance-tests/extensions/xk6-output-logger
        ```
    * **For `xk6-output-opensearch`:**
        ```bash
        git clone [https://github.com/UserOfficeProject/user-office-proposal-performance-tests](https://github.com/UserOfficeProject/user-office-proposal-performance-tests)
        cd user-office-proposal-performance-tests/extensions/xk6-output-opensearch
        ```

2.  **Setup Environment:**
    * Ensure you have the necessary development environment for [xk6](https://github.com/grafana/xk6) for detailed instructions on setting up your environment and making changes. This includes installing Go, setting up your GOPATH, and understanding the `xk6` build process.
    * Follow the specific instructions within the [XK6 documentation](https://github.com/grafana/xk6) to build and test your extensions locally.

## Adding New Extensions

1.  **Create a New Directory:**
    * Within the `extensions` directory, create a new folder for your extension. Choose a descriptive name. For example, `xk6-your-new-extension`.
2.  **Follow step 2 above**