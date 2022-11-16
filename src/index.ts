import {GraphRenderer, OnFinish} from "./renderer";
import {Graph} from "./models";
import fs from "fs";
import {VSCODE_THEME} from "./renderer-themes";
import {GraphRendererLayout} from "./renderer-layout";
import {GraphParser} from "./parser";
import * as path from "path";

const renderer = new GraphRenderer();
renderer.width = 1280;
renderer.height = 1280;
renderer.theme = VSCODE_THEME;
renderer.layout = GraphRendererLayout.Tree;

const templatePath = path.join(__dirname, "../input/template.json");
const wrapperPath = path.join(__dirname, "../input/wrapper.json");
const graphParser = new GraphParser(templatePath, wrapperPath);

console.log("Using " + path.basename(templatePath) + " as template...");
console.log("Using " + path.basename(wrapperPath) + " as answer set data...");

try {
    const renderingPromises: Promise<OnFinish>[] = [];

    graphParser.toGraphs().forEach((graph: Graph, index) => {
        console.log(`Rendering graph ${index}...`);

        let rendering = renderer.render(graph);
        rendering.then((img: OnFinish) => {
            const filepath = 'output/graph-' + index + '-' + Date.now() + '.png';
            fs.writeFileSync(filepath, img.base64Data, 'base64');
            console.log(`Graph ${index} saved as ${filepath}`);
        });
        renderingPromises.push(rendering);
    });

    Promise.all(renderingPromises).then(() => process.exit(1));
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.log('an error occurred: ', error);
    }
}