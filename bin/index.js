#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import chalk from 'chalk';

(async () => {
    console.log(chalk.green('Welcome to create-tsx-node!'));

    const { projectName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Enter your project name:',
            validate: input => input ? true : 'Project name is required!',
        },
    ]);

    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
        console.error(chalk.red('Error: Project directory already exists.'));
        process.exit(1);
    }

    fs.mkdirSync(projectPath);
    console.log(chalk.blue('Setting up the project...'));

    fs.mkdirSync(path.join(projectPath, 'src'));
    fs.writeFileSync(
        path.join(projectPath, 'src', 'index.ts'),
        `import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

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
                    outDir: './build',
                    rootDir: './src',
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
build/
.env
`
    );

    console.log(chalk.blue('Installing dependencies...'));
    execSync(
        `cd ${projectPath} && npm init -y && npm install express nodemon && npm install --save-dev typescript @types/node @types/express concurrently`,
        { stdio: 'inherit' }
    );

    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJson.scripts = {
        ...packageJson.scripts,
        build: 'tsc',
        start: "concurrently -k \"tsc --watch\" \"nodemon build/index.js\"",
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    console.log(chalk.blue('Performing initial TypeScript build...'));
    execSync(`cd ${projectPath} && npx tsc`, { stdio: 'inherit' });
    console.log(chalk.green('Initial TypeScript build complete.'));

    console.log(chalk.green('Project setup complete!'));
    console.log(chalk.green(`Navigate to the ${projectName} folder and run:`));
    console.log(chalk.cyan('  npm start'));
})();
