import DeclareVariable from "@nodes/declare/DeclareVariable";
import Expression from "@nodes/expression/Expression";
import Literal from "@nodes/literal/Literal";
import Declare from "@nodes/declare/Declare";
import Tag, {Modifiers} from "@shared/Tag";
import Token from "@shared/Token";
import Block from "@nodes/Block";
import Span from "@shared/Span";

export type FunctionModifiers = typeof Modifiers

export class DeclareParameter extends DeclareVariable {
    public identifier: Token<string>;
    public span: Span;
    public valueType: Token<string> | undefined;
    public modifiers: typeof Modifiers;
    public default: Expression | Literal<any>
    public optional: Boolean

    constructor(identifier: Token<string>, type: Token<string>, defaultValue: Expression | Literal<any>, optional: Boolean, span: Span) {
        super([], type?.tag ?? Tag.Constant, identifier, type, defaultValue, span);
        this.optional = optional
    }

    toString() {
        return `${this.identifier.content}${this.optional ? "?" : ""}${this.default ? "=" + this.default : ""}`
    }
}

export class DeclareFunction extends Declare {
    identifier: Token<string>;
    resultType: Token<string> | undefined
    parameters: DeclareParameter[]
    content: Block
    modifiers: FunctionModifiers
    span: Span;

    constructor(modifiers: FunctionModifiers, identifier: Token<string>, parameters: DeclareParameter[], resultType: Token<string> | undefined, content: Block, span: Span) {
        super();
        this.modifiers = modifiers
        this.identifier = identifier
        this.parameters = parameters
        this.resultType = resultType
        this.content = content
        this.span = span
    }

    toString() {
        return `${this.identifier.content}(${this.parameters.map(parameter => parameter.toString()).join(',')})`
    }
}