// content.js
// 定義我們想要的跳轉秒數
const SEEK_TIME = 5

// 監聽鍵盤按下事件
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) {
    return // 如果使用者按了組合鍵，我們絕對不攔截
  }

  // --- 1. 焦點檢查 (Focus Check) ---
  const target = event.target

  // 如果現在焦點是在「輸入框」(input) 或「文字區域」(textarea)
  // 或者是開啟了「可編輯內容」(contentEditable) 的元素
  if (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  ) {
    // 直接結束這個 Function，讓瀏覽器去跑原本的打字邏輯
    return
  }

  // 找到頁面上的影片元件
  const video = document.querySelector('video')

  // 如果畫面上沒有影片，就什麼都不做
  if (!video) return

  // 判斷是否為 Live 狀態：
  // duration 是無限大
  const isLiveStatus = video.duration === Infinity

  if (isLiveStatus) {
    // 【直播狀態】：直接 return，不執行 stopPropagation
    // 這樣瀏覽器會觸發 Twitch 原生的左右鍵邏輯（10s 且包含狀態切換）
    return
  }

  // 檢查是否按下了左箭頭或右箭頭
  if (event.key === 'ArrowRight') {
    // 阻止 Twitch 原本的 10 秒跳轉
    event.stopImmediatePropagation()
    event.preventDefault()

    // 執行自定義的 5 秒跳轉
    const targetTime = video.currentTime + SEEK_TIME

    if (targetTime < video.duration) {
      video.currentTime = targetTime
    } else {
      // 當播放進度快進到最新實況進度時 模擬按下跳到live
      const liveBtn = document.querySelector('.tw-channel-status-indicator')?.closest('button')
      liveBtn.click()
    }
  } else if (event.key === 'ArrowLeft') {
    // 阻止原本行為
    event.stopImmediatePropagation()
    event.preventDefault()

    // 執行自定義的 5 秒回退
    video.currentTime = Math.max(0, video.currentTime - SEEK_TIME)
  }
}, true) // 注意：這裡的 true 代表「捕獲階段」攔截，優先度最高
