   // DOM Ԫ��
    const textInput = document.getElementById('text-input');
    const countBtn = document.getElementById('count-btn');
    const fileInput = document.getElementById('file-input');
    const notification = document.getElementById('notification');
    
    // �yӋ�Y��Ԫ��
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

    // �@ʾ֪ͨ
    function showNotification(message) {
      notification.textContent = message;
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }

    // Ӌ���ı�
    function analyzeText(text) {
      // �Ƴ����� HTML �꺞
      text = text.replace(/<[^>]*>/g, '');
      
      // �����yӋ
      const totalChars = text.length;
      
      // �����ַ����������ı��c��
      const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
      
      // Ӣ���ַ�
      const englishChars = (text.match(/[a-zA-Z]/g) || []).length;
      
      // ����
      const numbers = (text.match(/\d/g) || []).length;
      
      // ���ı��c
      const chinesePunctuation = (text.match(/[\u3000-\u303f\uFF00-\uFFEF]/g) || []).length;
      
      // Ӣ�ı��c
      const englishPunctuation = (text.match(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g) || []).length;
      
      // �ո���Ʊ��
      const whitespace = (text.match(/\s/g) || []).length;
      
      // ���䔵�����зָ���
      const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length;
      
      // ���~�������ڿո�ָ���
      const words = text.split(/\s+/).filter(word => word.trim().length > 0).length;
      
      // ���Ӕ������ھ�̖����̖���КU̖��
      const sentences = (text.match(/[.!?������]+/g) || []).length;
      
      // ƽ���~�L
      const totalWordLength = text.replace(/\s+/g, '').length - chineseChars - chinesePunctuation - englishPunctuation;
      const avgWordLength = words > 0 ? Math.round(totalWordLength / words * 10) / 10 : 0;
      
      // ƽ�����L�����~���λ��
      const avgSentenceLength = sentences > 0 ? Math.round(words / sentences * 10) / 10 : 0;
      
      // ����UI
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

    // ̎���ļ��ς�
    function handleFileUpload(file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        const content = e.target.result;
        textInput.value = content;
        analyzeText(content);
        showNotification('�ļ��ѳɹ����d��');
      };
      
      reader.onerror = function() {
        showNotification('�ļ��xȡʧ����Ո��ԇ��');
      };
      
      // �����ļ�����x����m���xȡ��ʽ
      if (file.type === 'text/plain' || 
          file.name.endsWith('.txt') || 
          file.name.endsWith('.md') || 
          file.name.endsWith('.html')) {
        reader.readAsText(file);
      }else {
        reader.readAsText(file); // �Lԇ���ı���ʽ�xȡ�����ļ�
      }
    }

    // �¼��O 
    countBtn.addEventListener('click', () => {
      const text = textInput.value;
      if (text.trim() === '') {
        showNotification('Ոݔ���ճ�N�ı����ݣ�');
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

    // �ı�ݔ��r���r����
    textInput.addEventListener('input', () => {
      // �����x�����@�e���r���½yӋ�����߱���ԭ�ӣ����Ñ��c�����o�|�l
    });

    // ��ʼ��
    document.addEventListener('DOMContentLoaded', () => {
      // ��ʼ�O��
    });