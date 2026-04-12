// content.js

// 定義我們想要的跳轉秒數
const SEEK_TIME = 5;

// 監聽鍵盤按下事件
document.addEventListener('keydown', (event) => {

  if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
    return; // 如果使用者按了組合鍵，我們絕對不攔截
  }

  // --- 1. 焦點檢查 (Focus Check) ---
  const target = event.target;

  // 如果現在焦點是在「輸入框」(input) 或「文字區域」(textarea)
  // 或者是開啟了「可編輯內容」(contentEditable) 的元素
  if (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  ) {
    // 直接結束這個 Function，讓瀏覽器去跑原本的打字邏輯
    return;
  }

  // --- 2. 排除音量控制項 (Twitch 專屬優化) ---
  // 檢查焦點是否在音量滑桿或包含音量控制的容器上
  // aria-label="音量" 或類別名稱包含 volume
  if (
    target.closest('[aria-label="Volume"]') ||
    target.closest('[aria-label="音量"]') ||
    target.closest('.volume-slider')
  ) {
    return; // 交給 Twitch 原生邏輯去改音量，我們不攔截
  }

  // 找到頁面上的影片元件
  const video = document.querySelector('video');

  // 如果畫面上沒有影片，就什麼都不做
  if (!video) return;

  // 檢查是否按下了左箭頭或右箭頭
  if (event.key === 'ArrowRight') {
    // 阻止 Twitch 原本的 10 秒跳轉
    event.stopImmediatePropagation();
    event.preventDefault();

    // 執行自定義的 5 秒跳轉
    video.currentTime = Math.min(video.duration, video.currentTime + SEEK_TIME);
  } else if (event.key === 'ArrowLeft') {
    // 阻止原本行為
    event.stopImmediatePropagation();
    event.preventDefault();

    // 執行自定義的 5 秒回退
    video.currentTime = Math.max(0, video.currentTime - SEEK_TIME);
  }
}, true); // 注意：這裡的 true 代表「捕獲階段」攔截，優先度最高 