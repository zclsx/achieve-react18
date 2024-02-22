// 导入Node.js的path模块，用于处理文件路径
import path from 'path';
// 导入Node.js的fs模块，用于文件系统操作
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
// 解析并获取packages目录的绝对路径，通常是源码所在的位置
const pkgPath = path.resolve(__dirname, '../../packages/');
// 解析并获取dist/node_modules目录的绝对路径，通常是打包后的包应该存放的位置
const distPath = path.resolve(__dirname, '../../dist/node_modules');

/**
 * 根据包名和是否是打包后的标志，解析出包的路径
 * @param {string} pkgName - 包名
 * @param {boolean} isDist - 是否是打包后的路径
 * @returns {string} - 返回解析后的包路径
 */
export function resolvePkgPath(pkgName, isDist) {
	// 如果是打包后的路径，则返回指向dist/node_modules下的包路径
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	// 否则，返回指向源码所在的packages目录下的包路径
	return `${pkgPath}/${pkgName}`;
}

/**
 * 读取并解析指定包的package.json文件
 * @param {string} pkgName - 包名
 * @returns {object} - 返回package.json文件内容的对象
 */
export function getPackageJSON(pkgName) {
	// 使用resolvePkgPath函数构造包的package.json文件的路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	// 同步读取package.json文件的内容
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	// 将读取的字符串内容解析为JSON对象并返回
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
	return [cjs(), ts(typescript)];
}
