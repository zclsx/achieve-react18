import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTag';
import { Flags, NoFlags } from './fiberFlags';
export class FiberNode {
	type: any;
	tag: WorkTag;
	pendingProps: Props;
	key: Key;
	stateNode: any;
	ref: Ref;

	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;

	memoizedProps: Props | null;
	alternate: FiberNode | null;
	flags: Flags;

	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		//实例
		this.tag = tag;
		this.key = key;
		this.stateNode = null; //HostComponent <div> div DOM

		this.type = null; //FunctionComponent () => {}

		//构成树状结构

		this.return = null; //指向父fiberNode => 作为一个工作单元return出去
		this.sibling = null; //右边兄弟fiberNode
		this.child = null; //子fiberNode
		this.index = 0; //<ul>li * 3</ul>

		this.ref = null;

		//作为工作单元
		this.pendingProps = pendingProps;
		this.memoizedProps = null;

		this.alternate = null;
		//副作用
		this.flags = NoFlags;
	}
}
