import { FiberNode } from './fiber';

//全局指针指向当前正在工作的fiberNode
let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

//最终执行的方法renderRoot
function renderRoot(root: FiberNode) {
	//初始化
	prepareFreshStack(root);
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.log('workLoop error', e);
			workInProgress = null;
		}
	} while (true);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	if (next !== null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;

		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
