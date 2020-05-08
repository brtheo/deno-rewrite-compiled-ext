import {ensureDir} from "https://deno.land/std@v0.42.0/fs/ensure_dir.ts"
import * as path from "https://deno.land/std/path/mod.ts"
import {writeFileStr} from "https://deno.land/std@v0.42.0/fs/write_file_str.ts"

/**
 * In a typescript transpiled app.js file, results will be as follow :
 * <before>
 * import foo from './bar.ts'
 * <after>
 * import foo from './bar.js'
 * @param fileContent 
 */
function rewriteExtOfImportedModule(fileContent: string): Promise<string> {
    const tsFileExtensionInImportStatement = new RegExp(/(?<=((import|export)\s(((\{([a-zA-Z0-9_, ]*)\})|(((\*\sas\s)?([a-zA-Z0-9_]*))))\s(from))|\s(\"|\'|\`)((\.|\/)*[a-zA-Z0-9\\-_/ ]*)\.))ts(?=(\"|\'|\`))/g)
    return new Promise(resolve => resolve(fileContent.replace(tsFileExtensionInImportStatement,'js'))) 
} 
export default async function(emitMap: {[s:string]:string} | ArrayLike<string>) {
    for( let [fileName, fileContent] of Object.entries<string>(emitMap)) {
        await ensureDir(path.dirname(fileName))
        const tsReplacedWithJs = await rewriteExtOfImportedModule(fileContent)
        await writeFileStr(fileName,tsReplacedWithJs)
    }
}
