export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostText
	| typeof HostComponent;

export const FunctionComponent = 0;

//ReactDOM.render()
export const HostRoot = 3;

//<div>123</div> div下面的文本123 => HostText
export const HostText = 6;

//<div>对应的fiberNode
export const HostComponent = 1;
