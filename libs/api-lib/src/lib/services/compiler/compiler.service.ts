import { TokenType } from '@angular/compiler';
import { Injectable } from '@nestjs/common';
import { dot } from '@tensorflow/tfjs-layers/dist/exports_layers';
import * as chevrotain from 'chevrotain';
import {  CstNode, CstParser, IToken, tokenLabel } from 'chevrotain';
import * as fs from 'fs'
import { lexerResult } from '../../models/general/lexerResult';


let scriptTemplate = "//State  //players   class script{\nplayers = [ //add players \n]}";


scriptTemplate = fs.readFileSync("templates/script.js","utf8");


  
    
  //geiing the script template into the var

let jsScript = scriptTemplate;

//user defined identifier
const tUserDefinedIdentifier = chevrotain.createToken({name:"UserDefinedIdentifier",pattern:/[a-zA-Z_]+[a-zA-Z0-9]*/});
// class and function declaration
        const tAction =(chevrotain.createToken({name:"Action",pattern:/action/,longer_alt:tUserDefinedIdentifier}));
        const tParameters =(chevrotain.createToken({name:"Parameters",pattern:/parameters/,longer_alt:tUserDefinedIdentifier}));
        const tCondition=(chevrotain.createToken({name:"Condition",pattern:/condition/,longer_alt:tUserDefinedIdentifier}));
        const tEffect=(chevrotain.createToken({name:"Effect",pattern:/effect/,longer_alt:tUserDefinedIdentifier}));
        const tState=(chevrotain.createToken({name:"State",pattern:/state/,longer_alt:tUserDefinedIdentifier}));
        const Turn=(chevrotain.createToken({name:"Turn",pattern:/turn/,longer_alt:tUserDefinedIdentifier}));
        const tPlayer=(chevrotain.createToken({name:"Player",pattern:/player/,longer_alt:tUserDefinedIdentifier}));
        const tCards=(chevrotain.createToken({name:"Card",pattern:/card/,longer_alt:tUserDefinedIdentifier}));
        const tTile=(chevrotain.createToken({name:"Tile",pattern:/tile/,longer_alt:tUserDefinedIdentifier}));
        const tPiece=(chevrotain.createToken({name:"Piece",pattern:/piece/,longer_alt:tUserDefinedIdentifier}));
        

        const tAddToBoard =(chevrotain.createToken({name:"AddToBoard",pattern:/addToBoard/,longer_alt:tUserDefinedIdentifier}));
        const tAddAdjacency =(chevrotain.createToken({name:"AddAdjacency",pattern:/addAdjacency/,longer_alt:tUserDefinedIdentifier}));
        const tAddPieceToTile =(chevrotain.createToken({name:"addPieceToTile",pattern:/addPieceToTile/,longer_alt:tUserDefinedIdentifier}));
        
        const tGetTileByID =(chevrotain.createToken({name:"getTileByID",pattern:/getTileByID/,longer_alt:tUserDefinedIdentifier}));
        const tGetTilesByType =(chevrotain.createToken({name:"getTilesByType",pattern:/getTilesByType/,longer_alt:tUserDefinedIdentifier}));
        

        const tEndgame=(chevrotain.createToken({name:"Endgame",pattern:/endgame/,longer_alt:tUserDefinedIdentifier}));
        const tReturn=(chevrotain.createToken({name:"Return",pattern:/return/,longer_alt:tUserDefinedIdentifier}));

//punctuation
        const Comma=(chevrotain.createToken({name:"Comma",pattern:/,/}));
        const OpenBracket=(chevrotain.createToken({name:"OpenBracket",pattern:/\(/ }));
        const CloseBracket=(chevrotain.createToken({name:"CloseBracket",pattern:/\)/}));
        const OpenBrace=(chevrotain.createToken({name:"OpenBrace",pattern:/{/}));
        const CloseBrace=(chevrotain.createToken({name:"CloseBrace",pattern:/}/}));
        const Colon=(chevrotain.createToken({name:"Colon",pattern:/:/}));
        const OpenSquareBracket=(chevrotain.createToken({name:"OpenSquareBracket",pattern:/\[/}));
        const ClosedSquareBracket=(chevrotain.createToken({name:"ClosedSquareBracket",pattern:/\]/}));
        const QuestionMark=(chevrotain.createToken({name:"QuestionMark",pattern:/\?/}));
        const SemiColon=(chevrotain.createToken({name:"SemiColon",pattern:/;/}));
        const Dot = chevrotain.createToken({name:"Dot",pattern:/\./})
//relational operators
        const tGreaterThanOrEqual = chevrotain.createToken({name:"GreaterThanOrEqual",pattern:/>=/});
        const tLessThanOrEqual = chevrotain.createToken({name:"LessThanOrEqual",pattern:/<=/});
        const tEqual = chevrotain.createToken({name:"Equal",pattern:/==/});
        const GreaterThan=(chevrotain.createToken({name:"GreaterThan",pattern:/>/,longer_alt:tGreaterThanOrEqual}));
        const LessThan=(chevrotain.createToken({name:"LessThan",pattern:/</,longer_alt:tLessThanOrEqual}));

//Assignment operators
        const Assign=(chevrotain.createToken({name:"Assign",pattern:/=/,longer_alt:tEqual}));

//increment
        const tIncrement = chevrotain.createToken({name:"Increment",pattern:/\+\+/});

//decrement
        const tDecrement = chevrotain.createToken({name:"Decrement",pattern:/--/ });

//arithmetic operators
        const Plus=(chevrotain.createToken({name:"Plus",pattern:/\+/,longer_alt:tIncrement}));
        const Minus=(chevrotain.createToken({name:"Minus",pattern:/-/,longer_alt:tDecrement}));
        const Multiply=(chevrotain.createToken({name:"Multiply",pattern:/\*/}));
        const Divide=(chevrotain.createToken({name:"Divide",pattern:/\\/}));
        const Mod=(chevrotain.createToken({name:"Mod",pattern:/mod/,longer_alt:tUserDefinedIdentifier}));

//logical operators
        const And=(chevrotain.createToken({name:"And",pattern:/and/,longer_alt:tUserDefinedIdentifier}));
        const Or=(chevrotain.createToken({name:"Or",pattern:/or/,longer_alt:tUserDefinedIdentifier}));
        const Not=(chevrotain.createToken({name:"Not",pattern:/not/,longer_alt:tUserDefinedIdentifier}));

//literals
        const tFloatLiteral = chevrotain.createToken({name:"FloatLiteral",pattern:/-?([1-9]+[0-9]*\.?[0-9]*|0?\.[0-9]+)/});


        const IntegerLiteral=(chevrotain.createToken({name:"IntegerLiteral",pattern:/0|-?[1-9][1-9]*/,longer_alt:tFloatLiteral}));
        const StringLiteral=(chevrotain.createToken({name:"StringLiteral",pattern:/("[A-Za-z0-9]*") | ('[A-Za-z0-9]*')/ }));
        const False=(chevrotain.createToken({name:"False",pattern:/false/,longer_alt:tUserDefinedIdentifier}));
        const True=(chevrotain.createToken({name:"True",pattern:/true/,longer_alt:tUserDefinedIdentifier}));


//input output
        const Input=(chevrotain.createToken({name:"Input",pattern:/input/,longer_alt:tUserDefinedIdentifier}));
        const Print=(chevrotain.createToken({name:"Print",pattern:/print/,longer_alt:tUserDefinedIdentifier}));
        const Read=(chevrotain.createToken({name:"Read",pattern:/read/,longer_alt:tUserDefinedIdentifier}));
        const ConsoleInput=(chevrotain.createToken({name:"ConsoleInput",pattern:/console.input/,longer_alt:tUserDefinedIdentifier}));
        const ConsoleOutput=(chevrotain.createToken({name:"ConsoleOutput",pattern:/console.print/,longer_alt:tUserDefinedIdentifier}));

//loops
        const While=(chevrotain.createToken({name:"While",pattern:/while/,longer_alt:tUserDefinedIdentifier}));
        const For=(chevrotain.createToken({name:"For",pattern:/for/,longer_alt:tUserDefinedIdentifier}));
        const Do=(chevrotain.createToken({name:"do",pattern:/do/,longer_alt:tUserDefinedIdentifier}));

//branch
        const If=(chevrotain.createToken({name:"If",pattern:/if/,longer_alt:tUserDefinedIdentifier}));
        const Else=(chevrotain.createToken({name:"Else",pattern:/else/,longer_alt:tUserDefinedIdentifier}));

//flow control
        const Break=(chevrotain.createToken({name:"Break",pattern:/break/,longer_alt:tUserDefinedIdentifier}));
        const Continue=(chevrotain.createToken({name:"Continue",pattern:/continue/,longer_alt:tUserDefinedIdentifier}));

//presets
        const Minmax=(chevrotain.createToken({name:"Minmax",pattern:/minmax/,longer_alt:tUserDefinedIdentifier}));
        const NeuralNetwork=(chevrotain.createToken({name:"NeuralNetwork",pattern:/neuralnetwork/}));

//variable
        const tVariable=(chevrotain.createToken({name:"Variable",pattern:/var/,longer_alt:tUserDefinedIdentifier}));
        const tLet=(chevrotain.createToken({name:"Let",pattern:/let/,longer_alt:tUserDefinedIdentifier}));

//whitespace
        const WhiteSpace=(chevrotain.createToken({name:"WhiteSpace",pattern:/\s+/,group: chevrotain.Lexer.SKIPPED}));

//comments
        const Coment=(chevrotain.createToken({name:"WhiteSpace",pattern:/\/\*[a-zA-Z0-9]*\*\//,group: chevrotain.Lexer.SKIPPED}));





 const AllTokens = [
    
    tAction,
    tParameters,
    tCondition,
    tEffect,
    tState,
    Turn,
    tPlayer,
    tCards,
    tTile,
    tPiece,
    tAddToBoard,
    tAddAdjacency,
    tAddPieceToTile,
    tGetTileByID,
    tGetTilesByType,
    tEndgame,
    tReturn,
    Comma,
    OpenBracket,
    CloseBracket,
    OpenBrace,
    CloseBrace,
    Colon,
    OpenSquareBracket,
    ClosedSquareBracket,
    QuestionMark,
    SemiColon,
    Dot,
    tLessThanOrEqual,
    tGreaterThanOrEqual,
    tEqual,
    GreaterThan,
    LessThan,
    Assign,
    tIncrement,
    tDecrement,
    Plus,
    Minus,
    Multiply,
    Divide,
    Mod,
    And,
    Or,
    Not,
    tFloatLiteral,
    IntegerLiteral,
    StringLiteral,
    False,
    True,
    Input,
    Print,
    Read,
    ConsoleInput,
    ConsoleOutput,
    While,
    For,
    Do,
    If,
    Else,
    Break,
    Continue,
    Minmax,
    NeuralNetwork,
    tVariable,
    tLet,
    WhiteSpace,
    Coment,
    tUserDefinedIdentifier,
];


@Injectable()
export class CompilerService {

    

    DSLparser = new parser();
    compile(input:string):string
    {
        return "compile " + input;
    }
     

    scanHelper(input:string):chevrotain.ILexingResult{
         const tokens:chevrotain.TokenType[] = AllTokens; 
         const lexer = new chevrotain.Lexer(tokens);
        
        return lexer.tokenize(input);
    }

    scan(input:string):lexerResult{
         const tokens:chevrotain.ILexingResult = this.scanHelper(input);
         const result:lexerResult = {
            success: true,
            errors: []
        }

        if(tokens.errors.length !== 0){
            result.success = false;
            //result.errors = tokens.errors;
        }

        return result;
    }

    parse(input:string):string{
        this.DSLparser.input = this.scanHelper(input).tokens;
         const cstOutput = this.DSLparser.Program();
        if(this.DSLparser.errors.length!=0)
        {
            throw Error(this.DSLparser.errors.toString()+"!!"+this.scanHelper(input).tokens[0].tokenType.PATTERN);
        }

        //otherwise successful parse
        

        return "parse " + cstOutput;

        
    }


    transpile(input:string)
    {
        this.DSLparser.input = this.scanHelper(input).tokens;
        const cstOutput = this.DSLparser.Program();
        if(this.DSLparser.errors.length!=0)
        {
            throw Error(this.DSLparser.errors.toString()+"!!"+this.scanHelper(input).tokens[0].tokenType.PATTERN);
        }
        //read in template file
        jsScript = scriptTemplate;
        //begin transpilation
        visit(cstOutput)

        return jsScript;
    }
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
class parser extends CstParser
{
    


    
    constructor() {
        

        
        super(AllTokens) //should allTokens

        this.performSelfAnalysis();
    }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
         this = this;
        
        
        public Program = this.RULE("Program", () => {
            this.SUBRULE(this.GameState)
            this.SUBRULE(this.Definition)
        });

        private Definition = this.RULE("Definition", () => {
            this.OPTION(() => {
                this.OR([
                    { ALT: () =>{ this.SUBRULE(this.Cards )
                            this.SUBRULE(this.Definition)}},

                            
                    { ALT: () =>{ this.SUBRULE(this.Players)
                            this.SUBRULE1(this.Definition)}},

                    { ALT: () =>{ this.SUBRULE(this.End_Game)
                            this.SUBRULE2(this.Definition)}}
                        
                ])
            });
        });
        
        private Cards = this.RULE("Cards", () => {
            this.CONSUME(tCards)
            this.CONSUME(tUserDefinedIdentifier)
            this.CONSUME(OpenBrace)
            this.SUBRULE(this.nParameters),
            this.SUBRULE(this.CardEffect )
            this.SUBRULE(this.CardCondition)
            this.CONSUME(CloseBrace)
        });
        private nParameters =this.RULE("nParameters", () => {
            this.CONSUME(tParameters )
            this.CONSUME(OpenBrace)
            this.SUBRULE(this.TypeList)
            this.CONSUME(CloseBrace)
        });

        private TypeList=this.RULE("TypeList", () => {
                this.MANY(() => {
                this.OPTION(() => {
                    this.SUBRULE(this.Type)
                    this.CONSUME(tUserDefinedIdentifier)
                });
            })
        });
        private CardCondition= this.RULE("CardCondition", () => {
            this.CONSUME(tCondition )
            this.CONSUME(OpenBrace)
            this.SUBRULE(this.statements)
            this.CONSUME(tReturn)
            this.OR([
                { ALT: () =>{ this.SUBRULE(this.Const )}}, 
                { ALT: () =>{ this.SUBRULE(this.nVariable)}}
            ])
            this.CONSUME(CloseBrace)
        });
        private CardEffect=this.RULE("CardEffect", () => {
            this.CONSUME(tEffect )

            this.CONSUME(OpenBrace)
            this.SUBRULE(this.statements)
            this.CONSUME(CloseBrace)
        });
        private GameState=this.RULE("GameState", () => {
            this.CONSUME(tState )
            this.CONSUME(OpenBrace)
            this.SUBRULE(this.Declarations )
            this.CONSUME(CloseBrace)
        });
        private Players=this.RULE("Players", () => {
            this.CONSUME(tPlayer)
            this.CONSUME(tUserDefinedIdentifier)
            this.CONSUME(OpenBrace)
            this.SUBRULE(this.Actions )
            this.SUBRULE(this.Declarations )
            this.CONSUME( Turn)
            this.CONSUME( OpenBracket)
            this.CONSUME( CloseBracket)
            this.CONSUME2( OpenBrace)
            this.SUBRULE(this.statements )
            this.CONSUME2( CloseBrace)
            this.CONSUME(CloseBrace)
        });

        private Actions=this.RULE("Actions", () => {
            this.MANY(() => {
                this.OPTION(() => {
                    
                this.CONSUME(tAction)
                this.CONSUME(tUserDefinedIdentifier)
                this.CONSUME(OpenBracket)
                this.SUBRULE(this.FormalParameters)
                this.CONSUME(CloseBracket)
                this.CONSUME(OpenBrace)  
                this.SUBRULE(this.statements )
                this.CONSUME(CloseBrace)  
                this.SUBRULE(this.nCondition )
                this.CONSUME1(tUserDefinedIdentifier)
                this.CONSUME1(OpenBracket)
                this.SUBRULE1(this.FormalParameters)
                this.CONSUME1(CloseBracket)
                this.CONSUME1(OpenBrace)
                this.SUBRULE1(this.statements)
                this.CONSUME(tReturn)
                this.OR([
                    { ALT: () =>{ this.SUBRULE(this.Const )}}, 
                    { ALT: () =>{ this.SUBRULE(this.nVariable)}}
                ])
                this.CONSUME1(CloseBrace)
                });
        })
        });
        private FormalParameters=this.RULE("FormalParameters", () => {
            this.OPTION(() => {
                this.CONSUME(tUserDefinedIdentifier)
                this.SUBRULE(this.OtherFormalParameters);
            });
        });
        private OtherFormalParameters=this.RULE("OtherFormalParameters", () => {
            this.OPTION(() => {
                this.CONSUME(tUserDefinedIdentifier)
                this.SUBRULE(this.OtherFormalParameters);
            });
        });
        private End_Game=this.RULE("End_Game", () => {
            this.CONSUME(tEndgame)
            this.CONSUME(OpenBrace)
            this.SUBRULE(this.statements)
            this.CONSUME(tReturn)

            this.OR([
                { ALT: () =>{ this.SUBRULE(this.Const )}}, 
                { ALT: () =>{ this.SUBRULE(this.nVariable)}}
            ])

            this.CONSUME(CloseBrace)
        });


        private statements=this.RULE("statements", () => {
            this.OPTION(() => {
                this.OR([
                    { ALT: () =>{ this.SUBRULE(this.IO )
                            this.SUBRULE(this.statements)}},

                            
                    { ALT: () =>{ this.SUBRULE(this.Call)
                            this.SUBRULE1(this.statements)}},

                    { ALT: () =>{ this.SUBRULE(this.Loop)
                            this.SUBRULE2(this.statements)}},

                    { ALT: () =>{ this.SUBRULE(this.Branch)
                            this.SUBRULE3(this.statements)}},

                    { ALT: () =>{ this.SUBRULE(this.Assignment )
                            this.SUBRULE5(this.statements)}},

                    { ALT: () =>{ this.SUBRULE(this.FlowControl )
                            this.SUBRULE6(this.statements)}},

                    { ALT: () =>{ this.CONSUME(tReturn )
                            this.SUBRULE(this.nVariable )}},
                ])
            });
        });
        private IO=this.RULE("IO", () => {
            
                this.OR([
                     
                        { ALT: () =>{ this.CONSUME(Input )
                            this.CONSUME(OpenBracket )
                            this.SUBRULE(this.Expression)
                            this.OPTION(() => {
                                this.CONSUME(Comma )
                            this.SUBRULE(this.nVariable )}
                              );
                            this.CONSUME(CloseBracket )
                        }},

                        { ALT: () =>{ 
                            this.CONSUME(ConsoleInput )
                            this.CONSUME2(OpenBracket )
                            this.SUBRULE2(this.Expression)
                        this.OPTION1(() => {
                            this.CONSUME1(Comma )
                            this.SUBRULE1(this.nVariable )}
                          );
                        this.CONSUME2(CloseBracket )
                    }},

                        

                        { ALT: () =>{ this.CONSUME(Print )
                            this.CONSUME3(OpenBracket )
                            this.SUBRULE3(this.Expression)
                        this.CONSUME3(CloseBracket )
                        }},

                        { ALT: () =>{ this.CONSUME(ConsoleOutput )
                            this.CONSUME5(OpenBracket )
                            this.SUBRULE4(this.Expression)
                        this.CONSUME5(CloseBracket )
                        }},
                    ])
                    
                });

                private Call=this.RULE("Call", () => {
            
                    this.OR([
                    { 
                        ALT: () =>{ 
                        this.SUBRULE(this.MethodCall)
                    }},
                    { 
                        ALT: () =>{ 
                        this.CONSUME(Minmax )
                        this.CONSUME(OpenBracket )
                        this.CONSUME(OpenBrace )
                        this.SUBRULE(this.statements)
                        this.CONSUME(CloseBrace )
                        this.CONSUME(CloseBracket )
                    }},
                    { 
                        ALT: () =>{ 
                        this.CONSUME(NeuralNetwork )
                        this.CONSUME1(OpenBracket )
                        this.CONSUME(StringLiteral )
                        this.CONSUME1(CloseBracket )
                    }},
                    ])
                    
                });


                private MethodCall=this.RULE("MethodCall", () => {
            
                    this.OR([

                        { 
                            ALT: () =>{ 
                            this.CONSUME(tEffect )
                            this.CONSUME(OpenBracket )
                            this.SUBRULE(this.Arguments )
                            this.CONSUME(CloseBracket )
                        }},
                        { 
                            ALT: () =>{ 
                                this.CONSUME(tCondition )
                                this.CONSUME1(OpenBracket )
                                this.SUBRULE1(this.Arguments )
                                this.CONSUME1(CloseBracket )
                        }},
                        { 
                            ALT: () =>{ 
                                this.SUBRULE(this.rGetTileByID)
                        }},
                        { 
                            ALT: () =>{ 
                                this.SUBRULE(this.rGetTilesByType) 
                        }},
                        { 
                            ALT: () =>{ 
                                this.SUBRULE(this.SpecialMethods) 
                        }},
                        
                    ])
                    
                });
                private rAddPieceToTile=this.RULE("rAddPieceToTile", () => {
                    this.CONSUME(tAddPieceToTile )
                                this.CONSUME(OpenBracket )
                                this.CONSUME(tUserDefinedIdentifier )
                                this.CONSUME(Comma )
                                this.SUBRULE(this.Value)
                                this.CONSUME(CloseBracket )
                })

                private rGetTileByID=this.RULE("rGetTileByID", () => {
                                this.CONSUME(tGetTileByID )
                                this.CONSUME2(OpenBracket )
                                this.SUBRULE(this.Expression)
                                this.CONSUME2(CloseBracket )
                })
                private rGetTilesByType=this.RULE("rGetTilesByType", () => {
                    this.CONSUME(tGetTilesByType )
                                this.CONSUME3(OpenBracket )
                                this.SUBRULE1(this.Expression)
                                this.CONSUME3(CloseBracket )
                    })

                private Loop=this.RULE("Loop", () => {
            
                    this.OR([

                        { 
                            ALT: () =>{ 
                            this.CONSUME(While )
                            this.CONSUME(OpenBracket )
                            this.SUBRULE(this.nCondition)
                            this.CONSUME(CloseBracket )
                            this.CONSUME(OpenBrace )
                            this.SUBRULE(this.statements)
                            this.CONSUME(CloseBrace )
                        }},
                        { 
                            ALT: () =>{ 
                                this.CONSUME(For )
                                this.CONSUME1(OpenBracket )
                                this.SUBRULE(this.ForLoopInitialiser )
                                this.CONSUME(SemiColon )
                                this.SUBRULE(this.ForLoopCondition )
                                this.CONSUME1(SemiColon )
                                this.SUBRULE(this.ForLoopStep )
                                this.CONSUME1(CloseBracket )
                                this.CONSUME1(OpenBrace )
                                this.SUBRULE1(this.statements)
                                this.CONSUME1(CloseBrace )
                        }},
                        { 
                            ALT: () =>{ 
                                this.CONSUME(Do )
                                this.CONSUME2(OpenBrace )
                                this.SUBRULE2(this.statements )
                                this.CONSUME2(CloseBrace )
                                this.CONSUME1(While )
                                this.CONSUME2(OpenBracket )
                                this.SUBRULE1(this.nCondition )
                                this.CONSUME2(CloseBracket )
                        }},
                    ])
                    
                });

                private ForLoopInitialiser=this.RULE("ForLoopInitialiser", () => {
                    this.OPTION(() => {
                        this.SUBRULE(this.nVariable)
                        this.this.CONSUME(Assign)
                        this.SUBRULE(this.Value)
                    })
                });


                private ForLoopCondition=this.RULE("ForLoopCondition", () => {
                    
                   this.SUBRULE(this.nCondition)
                    
                });
                private ForLoopStep=this.RULE("ForLoopStep", () => {
                    
                    this.SUBRULE(this.nVariable)
                    this.SUBRULE(this.Unary_Operator)
                     
                 });
                 private Branch=this.RULE("Branch", () => {
                    this.CONSUME(If )
                    this.CONSUME(OpenBracket )
                    this.SUBRULE(this.nCondition)
                    this.CONSUME(CloseBracket )
                    this.CONSUME(OpenBrace )
                    this.SUBRULE(this.statements)
                    this.CONSUME(CloseBrace )
                    this.SUBRULE(this.Alternative)


                 });
                 private Alternative=this.RULE("Alternative", () => {
                    this.OR([
                        { 
                            ALT: () =>{ 
                            this.SUBRULE(this.Branch)
                        }},
                        { 
                            ALT: () =>{ 
                            this.CONSUME(OpenBrace )
                            this.SUBRULE(this.statements)
                            this.CONSUME(CloseBrace )
                        }},
                    ])
                 });
                 private Declarations=this.RULE("Declarations", () => {
                    this.OPTION(() => {
                        this.SUBRULE(this.SpecialMethods )
                    })
                    this.OPTION1(() => {
                            
                                this.SUBRULE(this.nVariable )
                                
                                this.OPTION2(() => {
                                    this.SUBRULE(this.Field )
                                })


                                this.CONSUME(Assign)
                                this.OR2([
                                    { 
                                        ALT: () =>{ 
                                        this.SUBRULE(this.Const)
                                    }},
                                    { 
                                        ALT: () =>{ 
                                        this.SUBRULE(this.Declaration)
                                    }},
                                    { 
                                        ALT: () =>{ 
                                        this.CONSUME(tTile)
                                    }},
                                    { 
                                        ALT: () =>{ 
                                        this.CONSUME(tPiece)
                                    }},
                                ])
                            

                                this.SUBRULE(this.Declarations )
                            })

                 });
                 private SpecialMethods=this.RULE("SpecialMethods", () => {
                    this.OR([
                        { 
                            ALT: () =>{
                                this.SUBRULE(this.addTileToBoard )
                            }},
                            {
                            ALT: () =>{
                                this.SUBRULE(this.addAdj )
                            }},
                            {ALT: () =>{
                                this.SUBRULE(this.rAddPieceToTile )
                            }}
                            
                        ])
                 })
                 private addTileToBoard=this.RULE("addTileToBoard", () => {
                    
                    this.CONSUME(tAddToBoard)
                    this.CONSUME(OpenBracket)
                    this.CONSUME(tUserDefinedIdentifier)
                    this.CONSUME(CloseBracket)    
                 })
                 private addAdj=this.RULE("addAdj", () => {
                    
                    this.CONSUME(tAddAdjacency)
                    this.CONSUME(OpenBracket)
                    this.CONSUME(tUserDefinedIdentifier)
                    this.CONSUME(Comma)
                    this.CONSUME2(tUserDefinedIdentifier)
                    this.CONSUME(CloseBracket)    
                 })


                 private Declaration=this.RULE("Declaration", () => {
                                
            
                    this.CONSUME(tVariable)
                    this.CONSUME(tUserDefinedIdentifier)
                    this.SUBRULE(this.Field)
                });


                 private Assignment=this.RULE("Assignment", () => {
                    
                    this.SUBRULE(this.LHS )
                    this.CONSUME(Assign)
                    this.SUBRULE(this.RHS )
                 });

                 private LHS=this.RULE("LHS", () => {
                    
                    this.SUBRULE(this.nVariable )
                 });

                 private RHS=this.RULE("RHS", () => {
                    
                        this.OR([
                            { 
                                ALT: () =>{ 
                                this.SUBRULE(this.Expression )
                            }},
                            { 
                                ALT: () =>{ 
                                this.SUBRULE(this.Call )
                            }},
                            { 
                                ALT: () =>{ 
                                this.SUBRULE(this.IO )
                            }},
                            { 
                                ALT: () =>{ 
                                this.CONSUME(tPiece)
                            }}
                    ])
                });
                private FlowControl=this.RULE("FlowControl", () => {
                        
                    this.OR([
                        { 
                            ALT: () =>{ 
                            this.CONSUME(Break)
                        }},
                        { 
                            ALT: () =>{ 
                            this.CONSUME(Continue )
                        }}
                ])
            });
            private Expression=this.RULE("Expression", () => {
                this.SUBRULE(this.Value) 
                this.SUBRULE(this.dotContinuation)    
                this.OPTION(() => {
                            this.OR1([
                            {
                                ALT: () =>{ 
                                    this.SUBRULE1(this.Unary_Operator)
                                }
                            },
                            {
                                ALT: () =>{ 
                                    this.SUBRULE(this.Binary)
                                }
                            },
                            { 
                                ALT: () =>{ 
                                    this.OPTION1(() => {
                                    this.SUBRULE(this.Relational_Operator)
                                    this.SUBRULE2(this.Value)
                                    })
                                    this.OPTION2(() => {
                                        this.SUBRULE(this.Ternary)
                                    })
                                    
                            }},
                        ])
                })
            
        });
        private dotContinuation=this.RULE("dotContinuation", () => {
            //
            this.OPTION(() => {
                this.CONSUME(Dot)
                this.SUBRULE(this.Value) 
                this.SUBRULE(this.dotContinuation) 
            })
        })


        private Unary=this.RULE("Unary", () => {
                        
            this.OR([
                { 
                    ALT: () =>{ 
                        this.SUBRULE(this.nVariable)
                        this.SUBRULE(this.Unary_Operator)
                }},
                { 
                    ALT: () =>{ 
                        this.SUBRULE1(this.Unary_Operator)
                        this.SUBRULE1(this.nVariable)
                }}
        ])
    });
            private Unary_Operator=this.RULE("Unary_Operator", () => {
                                
                this.OR([
                    { 
                        ALT: () =>{ 
                            this.CONSUME(Minus)
                            this.CONSUME1(Minus)
                    }},
                    { 
                        ALT: () =>{ 
                            this.CONSUME(Plus)
                            this.CONSUME1(Plus)
                    }}
            ])
        });

        private Binary=this.RULE("Binary", () => {
                        
            this.SUBRULE(this.BinaryOperator)
            this.SUBRULE1(this.Value)
    });
    private  Value = this.RULE("Value", () => {
        this.OR([
            { 
                ALT: () =>{ 
                    this.SUBRULE(this.Const)
            }},
            { 
                ALT: () =>{ 
                    this.CONSUME(tUserDefinedIdentifier)
                    this.OPTION(() => {
                        this.SUBRULE(this.Field )
                    })
            }}
    ])
    });
    private BinaryOperator=this.RULE("BinaryOperator", () => {
                                
        this.OR([
                { 
                    ALT: () =>{ 
                        this.CONSUME(Minus)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(Plus)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(Multiply)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(Divide)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(Mod)
                }}
            ])
});


        private Ternary=this.RULE("Ternary", () => {
                                
            
            this.CONSUME(QuestionMark)
            this.SUBRULE(this.Ternary_Instr )
            this.CONSUME(Colon)
            this.SUBRULE1(this.Ternary_Instr)
        });


        private Ternary_Instr=this.RULE("Ternary_Instr", () => {
                                
            this.OR([
                { 
                    ALT: () =>{ 
                        this.SUBRULE(this.nVariable)
                }},
                { 
                    ALT: () =>{ 
                        this.SUBRULE(this.Const)
                }}
        ])
    });

    private nCondition=this.RULE("nCondition", () => {
                                
        this.OR([
            { 
                ALT: () =>{ 
                    this.CONSUME(OpenBracket)
                    this.SUBRULE(this.nCondition)
                    this.CONSUME(CloseBracket)
            }},
            { 
                ALT: () =>{ 
                    this.CONSUME(Not)
                    this.CONSUME1(OpenBracket)
                    this.SUBRULE1(this.nCondition)
                    this.CONSUME1(CloseBracket)
            }},
            { 
                ALT: () =>{ 
                    this.SUBRULE(this.nVariable)
                    this.OR1([
                        { ALT: () =>{ 
                            this.SUBRULE(this.Logical_Operator )
                            this.SUBRULE2(this.nCondition)
                        }}, 
                        { ALT: () =>{ 
                            this.SUBRULE(this.Relational_Operator  )
                            this.SUBRULE(this.Expression)
                        }}
                    ])
                    
            }},
            { 
                ALT: () =>{ 
                    this.SUBRULE(this.Const)
                    this.OR2([
                        { ALT: () =>{ 
                            this.SUBRULE1(this.Logical_Operator )
                            this.SUBRULE3(this.nCondition)
                        }}, 
                        { ALT: () =>{ 
                            this.SUBRULE1(this.Relational_Operator)
                            this.SUBRULE1(this.Expression)
                        }}
                    ])
                    
                    
            }}
    ])
});

        

        private Logical_Operator=this.RULE("Logical_Operator", () => {
                                        
            this.OR([
                { 
                    ALT: () =>{ 
                        this.CONSUME(And)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(Or)
                }}
        ])
        });

        private Relational_Operator=this.RULE("Relational_Operator", () => {
                                        
            this.OR([
                { 
                    ALT: () =>{ 
                        this.CONSUME(LessThan)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(GreaterThan)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(tLessThanOrEqual)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(tGreaterThanOrEqual)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(tEqual)
                }}
        ])
        });


        

        private Field=this.RULE("Field", () => {
                                
            this.OPTION(() => {
                this.CONSUME(OpenSquareBracket)
                this.SUBRULE(this.Index)
                this.CONSUME(ClosedSquareBracket)
            })
        });




        private Index=this.RULE("Index", () => {
                                        
            this.OR([
                { 
                    ALT: () =>{ 
                        this.SUBRULE(this.Const)
                }},
                { 
                    ALT: () =>{ 
                        this.SUBRULE(this.nVariable)
                }},
        ])
        });


        private Const=this.RULE("Const", () => {
                                        
            this.OR([
                { 
                    ALT: () =>{ 
                        this.CONSUME(tFloatLiteral)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(StringLiteral)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(True)
                }},
                { 
                    ALT: () =>{ 
                        this.CONSUME(False)
                }}
                ,
                { 
                    ALT: () =>{ 
                        this.CONSUME(IntegerLiteral)
                }}
        ])
        });

        
        private nVariable=this.RULE("nVariable", () => {
            this.OPTION(() => {                 
            this.OR([
                {
                    ALT: () =>{ 
                    this.CONSUME(tVariable)
                    }
                },
                {
                    ALT: () =>{ 
                    this.CONSUME(tLet)
                    }
                }
            ])
        })
            this.CONSUME(tUserDefinedIdentifier)
            this.OPTION2(() => {
                this.SUBRULE(this.Field)
            })
            this.OPTION3(() => {
                this.CONSUME(Dot)
                this.SUBRULE(this.nVariable)
                
            })

        });

        private Type=this.RULE("Type", () => {
                                        
            
            this.CONSUME(tPlayer)
                
        
        });
        private Arguments=this.RULE("Arguments", () => {
                                        
            this.OPTION(() => {
                this.OR([
                    { 
                        ALT: () =>{ 
                            this.CONSUME(tUserDefinedIdentifier)
                            this.SUBRULE(this.otherArgs)
                    }},
                    { 
                        ALT: () =>{ 
                            this.SUBRULE(this.Const)
                            this.SUBRULE1(this.otherArgs)
                    }}
                ])
            })
        });


        private otherArgs=this.RULE("otherArgs", () => {
            this.MANY(() => {                            
                this.OPTION(() => {
                    this.OR([
                        { 
                            ALT: () =>{ 
                                this.CONSUME(tUserDefinedIdentifier)
                                this.SUBRULE(this.otherArgs)
                        }},
                        { 
                            ALT: () =>{ 
                                this.SUBRULE(this.Const)
                                this.SUBRULE1(this.otherArgs)
                        }}
                    ])
                })
            })
        });
        

    

    

}


//visitor methods for the dsl

function visit(cstOutput:CstNode)
{
    
    let k: keyof typeof cstOutput.children;  // visit all children
        for (k in cstOutput.children) {
            const child = cstOutput.children[k];  // current child
            
            //decide what to do for specific childs

            const node = child[0] as unknown as CstNode;
            switch(node.name)//visit specific child node
            {
                case "GameState":
                    visitGameState(node);
                    break;
                case "Definition":
                    visit(node);
                    break;
                case "Cards":
                    visitCards(node);
                    break;
                case "Players":
                    visitPlayer(node);
                    break;
                case "End_Game":
                    visitEnd(node);
                    break;
                
            }
            

            
        }
}

function visitGameState(cstOutput:CstNode)
{
    //
    
    let k: keyof typeof cstOutput.children;  // visit all children
        for (k in cstOutput.children) {
            const child = cstOutput.children[k];

            const node = child[0] as unknown as CstNode;
            const token = child[0] as unknown as IToken;
            
            
            
            //if it a token decide how to write
            if(token.image)
            {
                

                
                if(token.tokenType.name != "StringLiteral")
                {
                    switch(token.image)
                    {
                        case "state":
                            break;
                        case "{":
                            break;    
                        case "}":
                            break; 
                        case "var":
                            break;
                        case "tile":
                            jsScript = [jsScript.slice(0, jsScript.indexOf("//State")), 'new tile()\n' , jsScript.slice(jsScript.indexOf("//State"))].join('');
                                
                            break;
                        case "Dot":
                                jsScript = [jsScript.slice(0, jsScript.indexOf("//State")-1), token.image+ '', jsScript.slice(jsScript.indexOf("//State"))].join('');
                                break;
                        default:
                            jsScript = [jsScript.slice(0, jsScript.indexOf("//State")), token.image+ ' ', jsScript.slice(jsScript.indexOf("//State"))].join('');
                            
                            break;
                    }
                }
                else
                {
                    jsScript = [jsScript.slice(0, jsScript.indexOf("//State")), '"'+token.image+ '"', jsScript.slice(jsScript.indexOf("//State"))].join('');
                            
                }
            }
            //if it is a node continue till token
            
            if(node.name == "Declarations")
            {
                jsScript = [jsScript.slice(0, jsScript.indexOf("//State")), '\n' , jsScript.slice(jsScript.indexOf("//State"))].join('');
                        
            }
            if(node.name != "SpecialMethods")
            {
                visitGameState(node);
            }
            else
            {
                specialVisit(node, "//tiles")
            }
            
            
        }

}
function visitCards(cstOutput:CstNode)
{
    //
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];

        const node = child[0] as unknown as CstNode;
        const token = child[0] as unknown as IToken;


        if(token.tokenType)
            {
                switch(token.tokenType.name)
                {
                    case "UserDefinedIdentifier":
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//cards")), "class "+token.image+ " extends cards ", jsScript.slice(jsScript.indexOf("//cards"))].join('');
                        break;
                    case "tCards":
                        break;
                    default:
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//cards")), token.image+ " ", jsScript.slice(jsScript.indexOf("//cards"))].join('');
                        break;

                }
            }

        if(node.name)
        {
            switch(node.name)
                {
                    case "nParameters":
                        visitParams(node)
                        break;
                    case "CardEffect":
                        visitEffect(node)
                        break;    
                    case "CardCondition":
                        visitCondition(node)
                        break; 
                }
        }
    }
    
    
}
function visitParams(cstOutput:CstNode)
{
    //
}
function visitEffect(cstOutput:CstNode)
{
    //
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];

        const node = child[0] as unknown as CstNode;
        const token = child[0] as unknown as IToken;


        if(token.tokenType)
            {
                switch(token.tokenType.name)
                {
                    case "tEffect":
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//cards")), token.image+ "()", jsScript.slice(jsScript.indexOf("//cards"))].join('');
                        break;
                    default:
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//cards")), token.image+ " ", jsScript.slice(jsScript.indexOf("//cards"))].join('');
                        break;

                }
            }

    }
        
}
function visitCondition(cstOutput:CstNode)
{
    //
}

function visitPlayer(cstOutput:CstNode)
{
    //
    let k: keyof typeof cstOutput.children;  // visit all children
        for (k in cstOutput.children) {
            const child = cstOutput.children[k];
            
            const node = child[0] as unknown as CstNode;
            const token = child[0] as unknown as IToken;


            if(token.tokenType)
            {
                switch(token.tokenType.name)
                {
                    case "Player":
                        break;
                    case "UserDefinedIdentifier":
                        //
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), "class "+token.image+ " extends player ", jsScript.slice(jsScript.indexOf("//players"))].join('');
                        //write to add players
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//add players")), "new "+token.image+ "(),", jsScript.slice(jsScript.indexOf("//add players"))].join('');
                        
                        break; 
                    case "CloseBracket":
                        //
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), token.image+ '{ ', jsScript.slice(jsScript.indexOf("//players"))].join('');
                        break;     
                    default:
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), token.image+ ' ', jsScript.slice(jsScript.indexOf("//players"))].join('');
                }
            }
            
            visitPlayerStatements(node);
            if(node.name == "statements")
            {
                jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), '}' , jsScript.slice(jsScript.indexOf("//players"))].join('');
                        
            }
            if(node.name == "Declarations")
            {
                jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), ';' , jsScript.slice(jsScript.indexOf("//players"))].join('');
                        
            }
        }
}
function visitPlayerStatements(cstOutput:CstNode)
{
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        const node = child[0] as unknown as CstNode;
        const token = child[0] as unknown as IToken;
        if(node.name == "statements")
        {
            jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), '\n' , jsScript.slice(jsScript.indexOf("//players"))].join('');
                    
        }

        if(token.tokenType)
        {
            
                
            
            switch(token.tokenType.name)
            {
                
                case "Variable": 
                    break;
                case "ConsoleInput":
                    jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), 'console_Input', jsScript.slice(jsScript.indexOf("//players"))].join('');
                    break;    
                case "ConsoleOutput":
                    jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), 'console.log ', jsScript.slice(jsScript.indexOf("//players"))].join('');
                    break;
                case "Piece":
                    jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), 'new piece() ', jsScript.slice(jsScript.indexOf("//players"))].join('');
                    break;
                default:
                    jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), token.image + ' ', jsScript.slice(jsScript.indexOf("//players"))].join('');
                    break;

            }

            
                
        
        }
       
        if(node.name == "MethodCall")
        {
            
            visitMethodCall(node, "//players")
        }
        else{
            visitPlayerStatements(node);
        }
    }
}
function visitMethodCall(cstOutput:CstNode, place:string)
{
    
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        const node = child[0] as unknown as CstNode;

        if(node.name)
        {
            switch(node.name)
            {
                case "rGetTileByID":
                    jsScript = [jsScript.slice(0, jsScript.indexOf(place)), 'this.State.', jsScript.slice(jsScript.indexOf(place))].join('');
     
                    visitGetTileByID(node, place)
                    break;
                case "rGetTilesByType":
                    jsScript = [jsScript.slice(0, jsScript.indexOf(place)), 'this.State.', jsScript.slice(jsScript.indexOf(place))].join('');
     
                    visitGetTilesByType(node,place)
                    break;
                case "SpecialMethods":
                    visitMethodCall(node,place)
                    break;
                case "rAddPieceToTile":
                    visitRAddPieceToTile(node, place)
                    break;
            }
        }
    }
}
function visitRAddPieceToTile(cstOutput:CstNode, place:string)
{
    
    let code = ".pieces.push(";
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        const node = child[0] as unknown as CstNode;
        const token = child[0] as unknown as IToken;
        if(token.tokenType)
        {
            if(token.tokenType.name == "UserDefinedIdentifier")
            {
                code = code+token.image+')\n'
            }
        }
        if(node.name)
        {
            if(node.name == "Value")
            {
                let i: keyof typeof node.children;
                for (i in node.children) {
                    const child = node.children[i];
                    const tokeni = child[0] as unknown as IToken;
                    if(tokeni.tokenType)
                    {
                        if(tokeni.tokenType.name == "UserDefinedIdentifier")
                        {
                            code = tokeni.image+code
                        }
                    }

                }
            }
        }
        }


        

    
    jsScript = [jsScript.slice(0, jsScript.indexOf(place)), code, jsScript.slice(jsScript.indexOf(place))].join('');
     
}


function visitGetTileByID(cstOutput:CstNode, place:string)
{
            
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        const node = child[0] as unknown as CstNode;
        const token = child[0] as unknown as IToken;
        if(token.tokenType)
        {
            jsScript = [jsScript.slice(0, jsScript.indexOf(place)), token.image + '', jsScript.slice(jsScript.indexOf(place))].join('');
                    
        }
        if(node.name)
        {
            visitGetTileByID(node, place)
        }

    }
}
function visitGetTilesByType(cstOutput:CstNode, place:string)
{
    
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        const node = child[0] as unknown as CstNode;
        const token = child[0] as unknown as IToken;
        if(token.tokenType)
        {
            jsScript = [jsScript.slice(0, jsScript.indexOf(place)), token.image + ' ', jsScript.slice(jsScript.indexOf(place))].join('');
                    
        }
        if(node.name)
        {
            visitGetTilesByType(node, place)
        }

    }
}
function visitEnd(cstOutput:CstNode)
{
    //
    let k: keyof typeof cstOutput.children;  // visit all children
        for (k in cstOutput.children) {
            const child = cstOutput.children[k];
            const node = child[0] as unknown as CstNode;
            const token = child[0] as unknown as IToken;


            if(token.tokenType)
            {
                switch(token.tokenType.name)
                {
                    case "tEndgame":
                        break;
                    case "OpenBrace":
                        break; 
                    case "CloseBrace":
                        break; 
                    case "StringLiteral":
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//end_game")), '"'+token.image+ '"', jsScript.slice(jsScript.indexOf("//end_game"))].join('');
                        break;
                    default:
                        jsScript = [jsScript.slice(0, jsScript.indexOf("//end_game")), token.image+ ' ', jsScript.slice(jsScript.indexOf("//end_game"))].join('');
                }
            }
            if(node.name != "SpecialMethods")
            {
                visitEndStatements(node);
            }
            else
            {
                specialVisit(node, "//tiles")
            }
            if(node.name == "statements")
            {
                jsScript = [jsScript.slice(0, jsScript.indexOf("//players")), '}' , jsScript.slice(jsScript.indexOf("//players"))].join('');
                      
            }

        }
}
function visitEndStatements(cstOutput:CstNode)
{
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        
        const node = child[0] as unknown as CstNode;
        const token = child[0] as unknown as IToken;
        
        if(token.tokenType)
        {
            jsScript = [jsScript.slice(0, jsScript.indexOf("//end_game")), token.image + ' ', jsScript.slice(jsScript.indexOf("//end_game"))].join('');
        }
        visitEndStatements(node);
        if(node.name == "statements")
        {
            jsScript = [jsScript.slice(0, jsScript.indexOf("//end_game")), '\n' , jsScript.slice(jsScript.indexOf("//end_game"))].join('');
                    
        }
    }
}


function specialVisit(cstOutput:CstNode, place:string)
{
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        
        const node = child[0] as unknown as CstNode;

        if(node.name)
        {
            switch (node.name)
            {
                case "addTileToBoard":
                    addTile(node, place)
                    break;
                case "addAdj":
                    visitAdj(node, place)
                    break;
            }
        }
    }

}
function addTile(cstOutput:CstNode, place:string)
{
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        
        const token = child[0] as unknown as IToken;

        if(token.tokenType.name == "UserDefinedIdentifier")
        {
            jsScript = [jsScript.slice(0, jsScript.indexOf(place)),'this.board.push('+ token.image + ')\n', jsScript.slice(jsScript.indexOf(place))].join('');
        
        }
    }
}
function visitAdj(cstOutput:CstNode, place:string)
{
    let i = 0;
    let param1 = "";
    let k: keyof typeof cstOutput.children;  // visit all children
    for (k in cstOutput.children) {
        const child = cstOutput.children[k];
        
        const token = child[0] as unknown as IToken;
        if(token.tokenType.name == "UserDefinedIdentifier")
        {
            //
            if( i == 0)
            {
                param1 = token.image;
                i++;
            }
            else
            {
                //we have the second param
                jsScript = [jsScript.slice(0, jsScript.indexOf(place)),token.image+".Adjacencies.push("+param1+")\n"+param1+".Adjacencies.push("+token.image+")", jsScript.slice(jsScript.indexOf(place))].join('');
        
            }
        }

        
    }
}