#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';

(async () => {
    console.log(chalk.green('Welcome to create-tsx-node!'));

    const {
        projectName,
        port,
        srcFolder,
        buildFolder,
        includeWatchFeature,
    } = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter your project name:',
            validate: input => input ? true : 'Project name is required!',
        },
        {
            type: 'input',
            name: 'port',
            message: 'Enter the port for the server (default: 3000):',
            default: 3000,
            validate: input => /^\d+$/.test(input) || 'Port must be a number!',
        },
        {
            type: 'input',
            name: 'srcFolder',
            message: 'Enter the name of the source folder (default: "src"):',
            default: 'src',
        },
        {
            type: 'input',
            name: 'buildFolder',
            message: 'Enter the name of the build folder (default: "build"):',
            default: 'build',
        },
        {
            type: 'confirm',
            name: 'includeWatchFeature',
            message: 'Include live-reloading with tsc --watch and nodemon?',
            default: true,
        },
    ]);

    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
        console.error(chalk.red('Error: Project directory already exists.'));
        process.exit(1);
    }

    fs.mkdirSync(projectPath);
    console.log(chalk.blue('Setting up the project...'));

    const srcPath = path.join(projectPath, srcFolder);
    const buildPath = buildFolder;
    fs.mkdirSync(srcPath);
    fs.writeFileSync(
        path.join(srcPath, 'index.ts'),
        `import express from 'express';

const app = express();
const PORT = process.env.PORT || ${port};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});`
    );

    fs.writeFileSync(
        path.join(projectPath, 'tsconfig.json'),
        JSON.stringify(
            {
                compilerOptions: {
                    target: 'ES6',
                    module: 'CommonJS',
                    outDir: `./${buildPath}`,
                    rootDir: `./${srcFolder}`,
                    strict: true,
                    esModuleInterop: true,
                },
            },
            null,
            2
        )
    );

    fs.writeFileSync(
        path.join(projectPath, '.gitignore'),
        `node_modules/
${buildPath}/
.env
`
    );

    console.log(chalk.blue('Installing dependencies...'));
    const baseDependencies = 'express';
    const devDependencies = 'typescript @types/node @types/express';

    if (includeWatchFeature) {
        execSync(
            `cd ${projectPath} && npm init -y && npm install ${baseDependencies} && npm install --save-dev ${devDependencies} nodemon concurrently`,
            { stdio: 'inherit' }
        );
    } else {
        execSync(
            `cd ${projectPath} && npm init -y && npm install ${baseDependencies} && npm install --save-dev ${devDependencies}`,
            { stdio: 'inherit' }
        );
    }

    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    packageJson.scripts = {
        ...packageJson.scripts,
        build: 'tsc',
        ...(includeWatchFeature
            ? { start: `concurrently -k "tsc --watch" "nodemon ${buildPath}/index.js"` }
            : { start: `node ${buildPath}/index.js` }),
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log(chalk.blue('Performing initial TypeScript build...'));
    execSync(`cd ${projectPath} && npx tsc`, { stdio: 'inherit' });
    console.log(chalk.green('Initial TypeScript build complete.'));

    console.log(chalk.green('Project setup complete!'));
    console.log(chalk.green(`Navigate to the ${projectName} folder and run:`));
    console.log(chalk.cyan('  npm start'));
})();
