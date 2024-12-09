# Create-TSX-Node

`create-tsx-node` is a command-line tool that simplifies the setup of a TypeScript-ready Node.js project with Express. It automates the creation of the project structure, installs dependencies, and configures TypeScript with customizable options for an efficient development experience.

## Features

- Creates a new Node.js and Express project with TypeScript support.
- Prompts for user input to customize the project setup:
  - Specify the port on which the server starts (default: `3000`).
  - Choose the name of the source folder (default: `src`).
  - Choose the name of the build/output folder (default: `build`).
  - Decide whether to include live-reloading with `tsc --watch` and `nodemon` (default: included).
- Sets up `src` and `build` directories for development and output files.
- Configures TypeScript (`tsc`) for strict type checking and compatibility with Node.js.
- Optionally includes `nodemon` and `concurrently` for a seamless development experience.
- Generates a basic Express app boilerplate.

## Installation

To use this package, install it globally or use `npx` for on-the-fly execution:

### Global Installation
```bash
npm install -g create-tsx-node
```

### Usage with npx
```bash
npx create-tsx-node
```

## Usage

Run the following command to create a new TypeScript Node.js project:

```bash
npx create-tsx-node
```

Follow the prompts to:

1. Enter the project name (required).
2. Specify the port for the server (default: `3000`).
3. Choose the name of the source folder (default: `src`).
4. Choose the name of the build folder (default: `build`).
5. Decide whether to include live-reloading with `tsc --watch` and `nodemon` (default: included).

After completing the prompts, the tool will:

1. Create a new folder with the specified project name.
2. Set up the directory structure:
   - `<src-folder>/`: Contains the source code (e.g., `index.ts`).
   - `<build-folder>/`: Contains the compiled JavaScript output.
3. Generate necessary files such as `tsconfig.json` and `.gitignore`.
4. Install required dependencies:
   - Runtime: `express`
   - Development: `typescript`, `@types/node`, `@types/express`
   - Optional: `nodemon`, `concurrently` (if live-reloading is enabled).
5. Perform an initial TypeScript build (using `npx tsc`).

Navigate to the project folder and start the development server:

```bash
cd <project-name>
npm start
```

## Project Structure

The created project will have the following structure (customizable folder names based on user input):

```
<project-name>/
├── <src-folder>/          # Source code folder (default: "src")
│   └── index.ts           # Main entry point of the app
├── <build-folder>/        # Compiled JavaScript files (default: "build")
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project metadata and scripts
├── .gitignore             # Node.js-specific ignored files
└── node_modules/          # Installed dependencies
```

## Scripts

The following scripts are included in the `package.json`:

- **`build`**: Compiles the TypeScript files.
  ```bash
  npm run build
  ```
- **`start`**:
  - If live-reloading is enabled: Runs the development server using `tsc --watch` and `nodemon`.
    ```bash
    npm start
    ```
  - If live-reloading is disabled: Starts the compiled server directly.
    ```bash
    npm start
    ```

## Requirements

- Node.js (version 14 or above)
- npm (version 7 or above)

## Example

1. Create a new project:
   ```bash
   npx create-tsx-node
   ```
2. Follow the prompts to customize the setup.
3. Navigate to the project folder:
   ```bash
   cd my-app
   ```
4. Start the development server:
   ```bash
   npm start
   ```

Your application will be accessible at `http://localhost:<specified-port>`.

## Contributing

Contributions are welcome! If you encounter bugs or have ideas for new features, feel free to open an issue or submit a pull request.

---

With `create-tsx-node`, setting up a TypeScript-based Node.js project has never been easier or more customizable! 🚀