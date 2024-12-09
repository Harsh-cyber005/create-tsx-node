# Create-TSX-Node

`create-tsx-node` is a command-line tool that simplifies the setup of a TypeScript-ready Node.js project with Express. It automates the creation of the project structure, installs dependencies, and configures TypeScript with `tsc` and `nodemon` for an efficient development experience.

## Features

- Creates a new Node.js and Express project with TypeScript support.
- Sets up `src` and `build` directories for development and output files.
- Includes `tsc --watch` for continuous TypeScript compilation.
- Configures `nodemon` to monitor changes in the compiled output (`build/index.js`).
- Allows running both `tsc --watch` and `nodemon` with a single `npm start` command.
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

Follow the prompts to enter the project name. The tool will then:

1. Create a new folder with the specified project name.
2. Set up the directory structure:
   - `src/`: Contains the source code (e.g., `index.ts`).
   - `build/`: Contains the compiled JavaScript output.
3. Generate necessary files such as `tsconfig.json` and `.gitignore`.
4. Install required dependencies:
   - Runtime: `express`, `nodemon`
   - Development: `typescript`, `@types/node`, `@types/express`, `concurrently`
5. Perform an initial TypeScript build.

After setup, navigate to the project folder and start the development server:

```bash
cd <project-name>
npm start
```

## Project Structure

The created project will have the following structure:

```
<project-name>/
├── src/
│   └── index.ts           # Main entry point of the app
├── build/                 # Compiled JavaScript files (auto-generated)
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
- **`start`**: Runs the development server using `tsc --watch` and `nodemon`.
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
2. Enter the project name when prompted (e.g., `my-app`).
3. Navigate to the project folder:
   ```bash
   cd my-app
   ```
4. Start the development server:
   ```bash
   npm start
   ```

Your application will be accessible at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you encounter bugs or have ideas for new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

With `create-tsx-node`, setting up a TypeScript-based Node.js project has never been easier! 🚀