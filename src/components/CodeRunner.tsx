import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeRunnerProps {
  initialCode: string;
}

const CodeRunner = ({ initialCode }: CodeRunnerProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
        script.async = true;
        script.onload = async () => {
          const pyodide = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/'
          });
          pyodideRef.current = pyodide;
          setIsReady(true);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput('加载 Python 环境失败，请刷新页面重试。');
      }
    };
    loadPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodideRef.current) {
      setOutput('Python 环境正在加载中，请稍候...');
      return;
    }

    setIsLoading(true);
    setOutput('');

    try {
      const pyodide = pyodideRef.current;
      const outputs: string[] = [];
      
      pyodide.runPython(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      try {
        const result = pyodide.runPython(code);
        
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        if (stdout) {
          outputs.push(stdout);
        }
        
        if (result !== undefined && result !== null) {
          outputs.push(String(result));
        }
      } catch (error: any) {
        outputs.push(`代码错误: ${error.message}`);
      }

      setOutput(outputs.join('\n'));
    } catch (error: any) {
      setOutput(`运行异常: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">Python 运行器</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetCode}
            disabled={isLoading}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runCode}
            disabled={isLoading || !isReady}
            className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isLoading ? '运行中...' : !isReady ? '加载中...' : '运行'}</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-r border-slate-700">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 bg-slate-950 text-slate-300 font-mono text-sm resize-none focus:outline-none"
            placeholder="在此输入 Python 代码..."
          />
        </div>

        <div className="bg-slate-950">
          <div className="px-4 py-2 border-b border-slate-800">
            <span className="text-xs text-slate-500 font-medium">输出结果</span>
          </div>
          <div className="h-64 p-4 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.pre
                key={output || 'empty'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-mono text-slate-300 whitespace-pre-wrap"
              >
                {output || (
                  <span className="text-slate-600 italic">
                    点击"运行"按钮执行代码...
                  </span>
                )}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeRunner;
