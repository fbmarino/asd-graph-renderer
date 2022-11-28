import { GraphParser } from "../src/parser";
import { expect } from "chai";
import * as sinon from "sinon";
import fs from "fs";
import readSync from "readline-sync";
import Ajv from "ajv";
// /* A constant that is used to test the parser. */
// const GOOD_AS = [
//   {
//     as: ["node(1)", "cell(74,5)"],
//     cost: "1@2 2@3",
//   },
//   {
//     as: ["node(7)", "edge(7,7)"],
//     cost: "1@2",
//   },
// ];

// /* A constant that is used to test the parser. */
// const GOOD_TEMPLATE = {
//   nodes: "node/1",
//   edge: "edge/2",
// };

// /**
//  * It takes a template and a wrapper, and returns the output of the graph parser.
//  * @param {any} template - the template file
//  * @param {any} wrapper - the JSON object that is returned by the getJSON method
//  * @param {boolean} [flag=false] - boolean = false
//  * @returns The return value of the function.
//  */
// function graph_Fixture(template: any = GOOD_TEMPLATE,wrapper: any = GOOD_AS,flag: boolean = false) {
//   sinon.stub(fs, "existsSync").returns(true);
//   let g = new GraphParser("test1", "test2");
//   sinon.stub(g, <any>"get_json_flag").returns(flag);
//   sinon.stub(g, <any>"getJSON").onCall(0).returns(template).onCall(1).returns(wrapper);
//   const out = g.getAnswerSet();
//   return JSON.stringify(out);
// }
// /**
//  * It takes a list of nodes and a list of edges, and returns a list of objects, each of which has a
//  * list of nodes and a list of edges
//  * @returns The expected result.
//  * </code>
//  */
// function get_expected() {
//   return JSON.stringify([
//     { nodes: ["node(1)"], edge: [] },
//     { nodes: ["node(7)"], edge: ["edge(7,7)"] },
//   ]);
// }

describe("PARSER TEST", () =>{
    it("should throw an exception if the template is not valid", ()=>{
        expect(function(){
            new GraphParser({}, [])
        }).to.throw(Error);
    }),
    it("should throw an exception if nodes key does not contain at least one variable", ()=>{
        expect(function(){
            const no_param_template = {
                "template": "graph",
                "nodes": {
                    "atom":{
                        "name": "node",
                        "variables": []
                    },
                },
                "edge": {
                    "atom":{
                        "name": "edge",
                        "variables": ["to","from","weight"]
                    },
                }
        };
            new GraphParser(no_param_template,[]);
        }).to.throw(Error,"Template is not valid: /nodes/atom/variables must NOT have fewer than 1 items")
    }),
    it("should throw an error if nodes key does not contain <label> in variables", ()=>{
        expect(function(){
            const no_label_template = {
                "template": "graph",
                "nodes": {
                    "atom":{
                        "name": "node",
                        "variables": ["test"]
                    },
                },
                "edge": {
                    "atom":{
                        "name": "edge",
                        "variables": ["to","from","weight"]
                    },
                }
        };
            new GraphParser(no_label_template,[]);
        }).to.throw(Error,"Variables provided: \"test\" must contain \"label\"")
    })
})


// describe("Parser_Test", () => {
//   afterEach(function(){
//     sinon.restore();
//   })
//   it("should throw an error if you try to access an invalid template path", () => {
//     expect(function () {
//       new GraphParser("", "");
//     }).to.throw(Error, "Please, check the template_path you have given!");
//   }),
//   it("should throw an expection if you try to access an invalid dlv_path", ()=>{
//     sinon.stub(fs, "existsSync").onCall(0).returns(true).onCall(1).returns(false);
//     expect(function(){
//       let g = new GraphParser("test1", "test2");
//     }).to.throw(Error, "Please, check the dlv_path you have given!")
//   })
//   it("should throw an exception if the template file is not well formatted", () => {
//     sinon.stub(fs, "existsSync").returns(true);
//     let g = new GraphParser("test1","test2");
//     sinon.stub(g, <any>"getJSON").returns({ nodes: "asf_3", edge: "try&2" });
//     expect(function () {
//       g.getAnswerSet();
//     }).to.throw(
//       "Template Error: The template file is not syntactically right. Please check it!"
//     );
//   }),
//   it("should fetch the json file properly and get the answersets", () => {
//     const expected = get_expected();
//     const out = graph_Fixture();
//     expect(out).equal(expected);
//   }),
//   it("should save the answerset in a JSON file and be coherent", () => {
//     const out = graph_Fixture(GOOD_TEMPLATE, GOOD_AS, true);
//     expect(fs.existsSync("./graph.json")).to.be.true;
//     const expected = get_expected();
//     expect(out).equal(expected);
//   }),
//   it('should get the input from stdin and provide the correct answer set', () => {
//     sinon.stub(fs, "existsSync").returns(true);
//     let g = new GraphParser("test1", "test2");
//     sinon.stub(readSync,"question").returns(JSON.stringify(GOOD_AS));
//     sinon.stub(g, <any>"get_input_flag").returns(true);
//     const t = sinon.stub(g, <any>"getJSON").onCall(0).returns(GOOD_TEMPLATE).onCall(1).callsFake(()=>{
//       t.restore()
//       return g.getJSON("test2");
//     });
//     const out = g.getAnswerSet();
//     expect(JSON.stringify(out)).to.eq(get_expected())
//   })
// });
