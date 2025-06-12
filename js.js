   // DOM 元素
    const textInput = document.getElementById('text-input');
    const countBtn = document.getElementById('count-btn');
    const fileInput = document.getElementById('file-input');
    const notification = document.getElementById('notification');
    
    // 統計結果元素
    const totalCharsEl = document.getElementById('total-chars');
    const chineseCharsEl = document.getElementById('chinese-chars');
    const englishCharsEl = document.getElementById('english-chars');
    const numbersEl = document.getElementById('numbers');
    const chinesePunctuationEl = document.getElementById('chinese-punctuation');
    const englishPunctuationEl = document.getElementById('english-punctuation');
    const whitespaceEl = document.getElementById('whitespace');
    const paragraphsEl = document.getElementById('paragraphs');
    const wordsEl = document.getElementById('words');
    const sentencesEl = document.getElementById('sentences');
    const avgWordLengthEl = document.getElementById('avg-word-length');
    const avgSentenceLengthEl = document.getElementById('avg-sentence-length');

    // 顯示通知
    function showNotification(message) {
      notification.textContent = message;
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }

    // 計算文本
    function analyzeText(text) {
      // 移除所有 HTML 标簽
      text = text.replace(/<[^>]*>/g, '');
      
      // 基本統計
      const totalChars = text.length;
      
      // 中文字符（包括中文标點）
      const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
      
      // 英文字符
      const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
      
      // 數字
      const numbers = (text.match(/\d/g) || []).length;
      
      // 中文标點
      const chinesePunctuation = (text.match(/[\u3000-\u303f\uFF00-\uFFEF]/g) || []).length;
      
      // 英文标點
      const englishPunctuation = (text.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g) || []).length;
      
      // 空格和制表符
      const whitespace = (text.match(/\s/g) || []).length;
      
      // 段落數（空行分隔）
      const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;
      
      // 單詞數（基于空格分隔）
      const words = text.split(/\s+/).filter(word => word.trim().length > 0).length;
      
      // 句子數（基于句號、問號、感歎號）
      const sentences = (text.match(/[.!?。！？]+/g) || []).length;
      
      // 平均詞長
      const totalWordLength = text.replace(/\s+/g, '').length - chineseChars - chinesePunctuation - englishPunctuation;
      const avgWordLength = words > 0 ? Math.round(totalWordLength / words * 10) / 10 : 0;
      
      // 平均句長（以詞為單位）
      const avgSentenceLength = sentences > 0 ? Math.round(words / sentences * 10) / 10 : 0;
      
      // 更新UI
      totalCharsEl.textContent = totalChars;
      chineseCharsEl.textContent = chineseChars;
      englishCharsEl.textContent = englishChars;
      numbersEl.textContent = numbers;
      chinesePunctuationEl.textContent = chinesePunctuation;
      englishPunctuationEl.textContent = englishPunctuation;
      whitespaceEl.textContent = whitespace;
      paragraphsEl.textContent = paragraphs;
      wordsEl.textContent = words;
      sentencesEl.textContent = sentences;
      avgWordLengthEl.textContent = avgWordLength;
      avgSentenceLengthEl.textContent = avgSentenceLength;
    }

    // 處理文件上傳
    function handleFileUpload(file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const content = e.target.result;
        textInput.value = content;
        analyzeText(content);
        showNotification('文件已成功加載！');
      };
      
      reader.onerror = function() {
        showNotification('文件讀取失敗，請重試！');
      };
      
      // 根據文件類型選擇合適的讀取方式
      if (file.type === 'text/plain' || 
          file.name.endsWith('.txt') || 
          file.name.endsWith('.md') || 
          file.name.endsWith('.html')) {
        reader.readAsText(file);
      }else {
        reader.readAsText(file); // 嘗試以文本方式讀取其他文件
      }
    }

    // 事件監聽
    countBtn.addEventListener('click', () => {
      const text = textInput.value;
      if (text.trim() === '') {
        showNotification('請輸入或粘貼文本内容！');
        return;
      }
      analyzeText(text);
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    });

    // 文本輸入時實時更新
    textInput.addEventListener('input', () => {
      // 可以選擇在這裡實時更新統計，或者保持原樣，由用戶點擊按鈕觸發
    });

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
      // 初始設置
    });