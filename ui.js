//     // --- 타자 효과 (첫 섹션 전용) ---
//     (function(){
//     var line1Text = '웹 퍼블리셔 장수연입니다.';
//     var line2Text = 'HTML/CSS·JS로 사용자 친화적인 UI를 구현합니다.';
//     var l1 = null, l2 = null;
//     var typedOnce = false; // 여러 번 재생 방지

//     function typeInto(el, text, speed, cb){
//         var i = 0;
//         var timer = setInterval(function(){
//         el.textContent = text.slice(0, ++i);
//         if(i >= text.length){ clearInterval(timer); if(cb) cb(); }
//         }, speed);
//     }

//     function playTyping(){
//         if(typedOnce) return; typedOnce = true;
//         l1 = document.getElementById('type-line1');
//         l2 = document.getElementById('type-line2');
//         if(!l1 || !l2) return;
//         var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//         if(reduce){ l1.textContent = line1Text; l2.textContent = line2Text; return; }
//         typeInto(l1, line1Text, 55, function(){
//         setTimeout(function(){ typeInto(l2, line2Text, 38); }, 300);
//         });
//     }

//     var sec1 = document.getElementById('sec-1');
//     if(sec1){
//         var io2 = new IntersectionObserver(function(entries){
//         entries.forEach(function(e){ if(e.isIntersecting) { playTyping(); io2.disconnect(); } });
//         }, { root: document.getElementById('container'), threshold: 0.6 });
//         io2.observe(sec1);
//     }
//     if(document.getElementById('container').scrollTop < 10){ playTyping(); }
//     })();

//     // --- 섹션 등장 모션 (sec-1 제외) ---
//     (function(){
//     const container = document.getElementById('container');
//     const secs = document.querySelectorAll('main section');

//     secs.forEach(sec => {
//         if(sec.id === 'sec-1') return;
//         const h2 = sec.querySelector('.section-title');

//         const io = new IntersectionObserver(entries => {
//         entries.forEach(entry => {
//             if(entry.isIntersecting){
//             if(h2) h2.classList.add('show');
//             const items = sec.querySelectorAll('.fade-item');
//             items.forEach((el, idx) => setTimeout(() => el.classList.add('show'), idx * 120));
            
//             // sec-2일 때 counter 애니메이션 실행
//             if(sec.id === 'sec-2'){
//                 const counter = sec.querySelector('.counter');
//                 if(counter){
//                 let start = 0;
//                 let end = parseInt(counter.dataset.count);
//                 let duration = 1500;
//                 let stepTime = Math.abs(Math.floor(duration / end));
//                 let timer = setInterval(function(){
//                     start += 1;
//                     counter.textContent = start;
//                     if(start >= end) clearInterval(timer);
//                 }, stepTime);
//                 }
//             }

//             // sec-3이면 skill-fill 채우기
//             if(sec.id === 'sec-3'){
//                 const skillFills = sec.querySelectorAll('.skill-fill');
//                 skillFills.forEach((el, idx) => {
//                 setTimeout(() => {
//                     el.style.width = el.dataset.width || '80%';
//                 }, idx * 200); // 하나씩 딜레이 주면서 순차 채움
//                 });
//             }

//             io.unobserve(sec);
//             }
//         });
//         }, { root: container, threshold: 0.4 });
//         io.observe(sec);
//     });


//     })();


// // --- PC / Mobile 구분 ---
// const isPC = window.matchMedia("(min-width: 1024px)").matches;
// let STRICT_MODE = isPC ? true : false;  // ✅ PC는 원스크롤, 모바일은 자연 스크롤

// // --- 도트 & 진행바 (기존) ---
// let STRICT_MODE = true;
// const container = document.getElementById('container');
// const sections  = Array.from(container.querySelectorAll('section'));
// const dotsNav   = document.querySelector('.dots');
// const progress  = document.querySelector('.progress');

// // 섹션별 컬러 팔레트
// const progressColor = [
//   "#fbbf24", // sec-1
//   "#3b82f6", // sec-2
//   "#10b981", // sec-3
//   "#ef4444", // sec-4
//   "#8b5cf6", // sec-5
//   "#374151"  // sec-6
// ];

// // 도트 네비게이션 생성
// sections.forEach((sec, i) => {
//   const b = document.createElement('button');
//   b.className = 'dot';
//   b.type = 'button';
//   b.setAttribute('aria-label', `${i+1}번째 섹션으로 이동: ${sec.dataset.title || sec.id}`);
//   b.addEventListener('click', () => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }));
//   dotsNav.appendChild(b);
// });

// const dotEls = Array.from(document.querySelectorAll('.dot'));

// // 현재 섹션 감지 → 색상 업데이트
// const io = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const idx = sections.indexOf(entry.target);

//       // 도트 active 처리
//       dotEls.forEach((d, i) => {
//         d.classList.remove('active');
//         d.style.backgroundColor = "#d1d5db"; // 기본(비활성: 연한 회색)
//         if (i === idx) {
//           d.classList.add('active');
//           d.style.backgroundColor = progressColor[idx]; // ✅ 현재 섹션 색상으로 변경
//         }
//       });

//       // 진행바 퍼센트
//       const pct = Math.round((idx) / (sections.length - 1) * 100);
//       progress.style.setProperty('--progress', pct + '%');

//       // ✅ 진행바: 이전색 → 현재색 그라데이션
//       const prevColor = progressColor[Math.max(0, idx - 1)];
//       const currentColor = progressColor[idx];
//       progress.style.setProperty('--progress-color', `linear-gradient(to right, ${prevColor}, ${currentColor})`);
//     }
//   });
// }, { root: container, threshold: 0.6 });

// sections.forEach(s => io.observe(s));

// // ✅ 스크롤 위치 기반 width 업데이트
// container.addEventListener('scroll', () => {
//   const scrollTop = container.scrollTop;
//   const scrollHeight = container.scrollHeight - container.clientHeight;
//   const scrollPct = (scrollTop / scrollHeight) * 100;
//   progress.style.setProperty('--progress', scrollPct + '%');
// });


//     sections.forEach(s => io.observe(s));





//     // ===== 엄격 모드 교체 블록 시작 =====
//     let isAnimating = false;
//     let currentIdx = 0;

//     // 인덱스 동기화
//     const syncIndex = () => {
//     const y = container.scrollTop;
//     let closest = 0, min = Infinity;
//     sections.forEach((sec, i) => {
//         const d = Math.abs(sec.offsetTop - y);
//         if (d < min) { min = d; closest = i; }
//     });
//     currentIdx = closest;
//     };

//     // 엄격 모드 해제(자연 스크롤로 전환)
//     function disableStrictMode() {
//     if (!STRICT_MODE) return;
//     STRICT_MODE = false;

//     // 스냅 해제 → 자연 스크롤 허용
//     container.style.scrollSnapType = 'none';

//     // 이벤트 핸들러 제거
//     container.removeEventListener('wheel', wheelHandler, wheelOptions);
//     window.removeEventListener('keydown', keyHandler);
//     container.removeEventListener('touchstart', touchStartHandler, touchStartOptions);
//     container.removeEventListener('touchmove', touchMoveHandler, touchMoveOptions);

//     // GSAP 스크롤 계산 갱신
//     if (window.ScrollTrigger) ScrollTrigger.refresh();
//     }


//     // 엄격 모드 재활성화(자연 스크롤 → 섹션 단위 스크롤로 복귀)
//     function enableStrictMode() {
//     if (STRICT_MODE) return;   // 이미 엄격 모드면 무시
//     STRICT_MODE = true;

//     // 스냅 복구
//     container.style.scrollSnapType = 'y mandatory';

//     // 이벤트 핸들러 재바인딩
//     container.addEventListener('wheel', wheelHandler, wheelOptions);
//     window.addEventListener('keydown', keyHandler);
//     container.addEventListener('touchstart', touchStartHandler, touchStartOptions);
//     container.addEventListener('touchmove', touchMoveHandler, touchMoveOptions);

//     // 현재 위치 기준 인덱스 동기화 후 가장 가까운 섹션에 스냅
//     syncIndex();
//     sections[currentIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });

//     // GSAP/ScrollTrigger 다시 계산
//     if (window.ScrollTrigger) ScrollTrigger.refresh();
//     }



//     // 섹션 인덱스로 스크롤
//     function scrollToIndex(nextIdx) {
//     if (!STRICT_MODE) return;   // 자연 스크롤 모드면 개입 X
//     if (isAnimating) return;

//     nextIdx = Math.max(0, Math.min(sections.length - 1, nextIdx));
//     if (nextIdx === currentIdx) return;

//     isAnimating = true;
//     sections[nextIdx].scrollIntoView({ behavior: 'smooth' });
//     currentIdx = nextIdx;
//     setTimeout(() => { isAnimating = false; }, 700);
//     }

//     // 이벤트 핸들러들
//     function wheelHandler(e) {
//     if (!STRICT_MODE) return;   // 자연 스크롤 허용
//     e.preventDefault();
//     if (isAnimating) return;
//     const dir = Math.sign(e.deltaY);
//     if (dir > 0) scrollToIndex(currentIdx + 1);
//     else if (dir < 0) scrollToIndex(currentIdx - 1);
//     }
//     const wheelOptions = { passive: false };

//     function keyHandler(e) {
//     if (!STRICT_MODE) return;   // 자연 스크롤 허용
//     const keysNext = ['PageDown', 'ArrowDown', 'Space'];
//     const keysPrev = ['PageUp', 'ArrowUp'];
//     if (e.key === 'Home') { e.preventDefault(); scrollToIndex(0); }
//     else if (e.key === 'End') { e.preventDefault(); scrollToIndex(sections.length - 1); }
//     else if (keysNext.includes(e.key)) { e.preventDefault(); scrollToIndex(currentIdx + 1); }
//     else if (keysPrev.includes(e.key)) { e.preventDefault(); scrollToIndex(currentIdx - 1); }
//     }

//     let touchStartY = 0; 
//     let touchLocked = false;
//     const THRESHOLD = 40;

//     function touchStartHandler(e) {
//     if (!STRICT_MODE) return;   // 자연 스크롤 허용
//     if (e.touches.length === 1) {
//         touchStartY = e.touches[0].clientY;
//         touchLocked = false;
//     }
//     }
//     const touchStartOptions = { passive: true };

//     function touchMoveHandler(e) {
//     if (!STRICT_MODE) return;   // 자연 스크롤 허용
//     if (touchLocked || isAnimating) return;
//     const dy = e.touches[0].clientY - touchStartY;
//     if (Math.abs(dy) > THRESHOLD) {
//         touchLocked = true;
//         if (dy < 0) scrollToIndex(currentIdx + 1);
//         else scrollToIndex(currentIdx - 1);
//     }
//     }
//     const touchMoveOptions = { passive: true };

//     // 초기 바인딩
//     syncIndex();
//     container.addEventListener('wheel', wheelHandler, wheelOptions);
//     window.addEventListener('keydown', keyHandler);
//     container.addEventListener('touchstart', touchStartHandler, touchStartOptions);
//     container.addEventListener('touchmove', touchMoveHandler, touchMoveOptions);
//     container.addEventListener('scroll', syncIndex);
//     // ===== 엄격 모드 교체 블록 끝 =====







// $(function(){

// projectSldie();
// })


// function projectSldie(){

// var viewSwiper = new Swiper('.project-slide',{
//     slidesPerView: 2,
//     spaceBetween: 24,
//     loop: true,
//     loopAdditionalSlides : 3,
//     autoHeight: true,
//     speed : 500,
//     allowTouchMove: true,
//     autoplay:{
//     delay: 4000,
//     disableOnInteraction: false,
//     },
//     navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//     },
// });

// $('.project-slide').hover(
//     function(){
//     viewSwiper.autoplay.stop();
//     },
//     function(){
//     viewSwiper.autoplay.start();
//     }
// );
// }



// function countNum() {
// $('.counter').each(function() {
// var $this = $(this),
//     countTo = parseInt($this.attr('data-count'));
// $({ countNum: 0 }).animate({
//     countNum: countTo
// },
// {
//     duration: 1500,
//     easing: 'linear',
//     step: function() {
//     $this.text(Math.floor(this.countNum));
//     },
//     complete: function() {
//     $this.text(this.countNum);
//     }
// });
// });
// }
















// --- 타자 효과 (첫 섹션 전용) ---
(function(){
  var line1Text = '웹 퍼블리셔 장수연입니다.';
  var line2Text = 'HTML/CSS·JS로 사용자 친화적인 UI를 구현합니다.';
  var l1 = null, l2 = null;
  var typedOnce = false;

  function typeInto(el, text, speed, cb){
    var i = 0;
    var timer = setInterval(function(){
      el.textContent = text.slice(0, ++i);
      if(i >= text.length){ clearInterval(timer); if(cb) cb(); }
    }, speed);
  }

  function playTyping(){
    if(typedOnce) return; typedOnce = true;
    l1 = document.getElementById('type-line1');
    l2 = document.getElementById('type-line2');
    if(!l1 || !l2) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){ l1.textContent = line1Text; l2.textContent = line2Text; return; }
    typeInto(l1, line1Text, 55, function(){
      setTimeout(function(){ typeInto(l2, line2Text, 38); }, 300);
    });
  }

  var sec1 = document.getElementById('sec-1');
  if(sec1){
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting) { playTyping(); io2.disconnect(); } });
    }, { root: document.getElementById('container'), threshold: 0.6 });
    io2.observe(sec1);
  }
  if(document.getElementById('container').scrollTop < 10){ playTyping(); }
})();


// --- 섹션 등장 모션 (sec-1 제외) ---
(function(){
  const container = document.getElementById('container');
  const secs = document.querySelectorAll('main section');

  secs.forEach(sec => {
    if(sec.id === 'sec-1') return;
    const h2 = sec.querySelector('.section-title');

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          if(h2) h2.classList.add('show');
          const items = sec.querySelectorAll('.fade-item');
          items.forEach((el, idx) => setTimeout(() => el.classList.add('show'), idx * 120));
          
          // sec-2: counter
          if(sec.id === 'sec-2'){
            const counter = sec.querySelector('.counter');
            if(counter){
              let start = 0;
              let end = parseInt(counter.dataset.count);
              let duration = 1500;
              let stepTime = Math.abs(Math.floor(duration / end));
              let timer = setInterval(function(){
                start += 1;
                counter.textContent = start;
                if(start >= end) clearInterval(timer);
              }, stepTime);
            }
          }

          // sec-3: skill bar 채우기
          if(sec.id === 'sec-3'){
            const skillFills = sec.querySelectorAll('.skill-fill');
            skillFills.forEach((el, idx) => {
              setTimeout(() => {
                el.style.width = el.dataset.width || '80%';
              }, idx * 200);
            });
          }

          io.unobserve(sec);
        }
      });
    }, { root: container, threshold: 0.4 });
    io.observe(sec);
  });
})();


// --- PC / Mobile 구분 ---
function checkDevice() {
  return window.matchMedia("(min-width: 1024px)").matches;
}
let STRICT_MODE = checkDevice();   // ✅ PC면 원스크롤, 모바일은 자연 스크롤

const container = document.getElementById('container');
const sections  = Array.from(container.querySelectorAll('section'));
const dotsNav   = document.querySelector('.dots');
const progress  = document.querySelector('.progress');

// 섹션별 컬러 팔레트
const progressColor = [
  "#fbbf24", // sec-1
  "#3b82f6", // sec-2
  "#10b981", // sec-3
  "#ef4444", // sec-4
  "#8b5cf6", // sec-5
  "#374151"  // sec-6
];

// 도트 네비게이션 생성
sections.forEach((sec, i) => {
  const b = document.createElement('button');
  b.className = 'dot';
  b.type = 'button';
  b.setAttribute('aria-label', `${i+1}번째 섹션으로 이동: ${sec.dataset.title || sec.id}`);
  b.addEventListener('click', () => sec.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  dotsNav.appendChild(b);
});
const dotEls = Array.from(document.querySelectorAll('.dot'));

// 현재 섹션 감지 → 색상 업데이트
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = sections.indexOf(entry.target);

      // 도트 색상
      dotEls.forEach((d, i) => {
        d.classList.remove('active');
        d.style.backgroundColor = "#d1d5db";
        if (i === idx) {
          d.classList.add('active');
          d.style.backgroundColor = progressColor[idx];
        }
      });

      // 진행바 퍼센트 + 색상
      const pct = Math.round((idx) / (sections.length - 1) * 100);
      progress.style.setProperty('--progress', pct + '%');
      const prevColor = progressColor[Math.max(0, idx - 1)];
      const currentColor = progressColor[idx];
      progress.style.setProperty('--progress-color', `linear-gradient(to right, ${prevColor}, ${currentColor})`);
    }
  });
}, { root: container, threshold: 0.6 });

sections.forEach(s => io.observe(s));

// 스크롤 위치 기반 width 업데이트
container.addEventListener('scroll', () => {
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight - container.clientHeight;
  const scrollPct = (scrollTop / scrollHeight) * 100;
  progress.style.setProperty('--progress', scrollPct + '%');
});


// ===== 엄격 모드 블록 =====
let isAnimating = false;
let currentIdx = 0;

function syncIndex() {
  const y = container.scrollTop;
  let closest = 0, min = Infinity;
  sections.forEach((sec, i) => {
    const d = Math.abs(sec.offsetTop - y);
    if (d < min) { min = d; closest = i; }
  });
  currentIdx = closest;
}

function scrollToIndex(nextIdx) {
  if (!STRICT_MODE || isAnimating) return;
  nextIdx = Math.max(0, Math.min(sections.length - 1, nextIdx));
  if (nextIdx === currentIdx) return;
  isAnimating = true;
  sections[nextIdx].scrollIntoView({ behavior: 'smooth' });
  currentIdx = nextIdx;
  setTimeout(() => { isAnimating = false; }, 700);
}

function wheelHandler(e) {
  if (!STRICT_MODE) return;
  e.preventDefault();
  if (isAnimating) return;
  const dir = Math.sign(e.deltaY);
  if (dir > 0) scrollToIndex(currentIdx + 1);
  else if (dir < 0) scrollToIndex(currentIdx - 1);
}
const wheelOptions = { passive: false };

function keyHandler(e) {
  if (!STRICT_MODE) return;
  const keysNext = ['PageDown', 'ArrowDown', 'Space'];
  const keysPrev = ['PageUp', 'ArrowUp'];
  if (e.key === 'Home') { e.preventDefault(); scrollToIndex(0); }
  else if (e.key === 'End') { e.preventDefault(); scrollToIndex(sections.length - 1); }
  else if (keysNext.includes(e.key)) { e.preventDefault(); scrollToIndex(currentIdx + 1); }
  else if (keysPrev.includes(e.key)) { e.preventDefault(); scrollToIndex(currentIdx - 1); }
}

let touchStartY = 0, touchLocked = false;
const THRESHOLD = 40;

function touchStartHandler(e) {
  if (!STRICT_MODE) return;
  if (e.touches.length === 1) {
    touchStartY = e.touches[0].clientY;
    touchLocked = false;
  }
}
function touchMoveHandler(e) {
  if (!STRICT_MODE || touchLocked || isAnimating) return;
  const dy = e.touches[0].clientY - touchStartY;
  if (Math.abs(dy) > THRESHOLD) {
    touchLocked = true;
    if (dy < 0) scrollToIndex(currentIdx + 1);
    else scrollToIndex(currentIdx - 1);
  }
}

// 바인딩/해제
function bindStrictMode() {
  syncIndex();
  container.addEventListener('wheel', wheelHandler, wheelOptions);
  window.addEventListener('keydown', keyHandler);
  container.addEventListener('touchstart', touchStartHandler, { passive: true });
  container.addEventListener('touchmove', touchMoveHandler, { passive: true });
  container.addEventListener('scroll', syncIndex);
}
function unbindStrictMode() {
  container.removeEventListener('wheel', wheelHandler, wheelOptions);
  window.removeEventListener('keydown', keyHandler);
  container.removeEventListener('touchstart', touchStartHandler);
  container.removeEventListener('touchmove', touchMoveHandler);
  container.removeEventListener('scroll', syncIndex);
}

// 초기 실행
if (STRICT_MODE) {
  bindStrictMode();
} else {
  unbindStrictMode();
  container.style.scrollSnapType = 'none';
}

// ✅ 화면 크기 변경 시 자동 전환 + 현재 위치 스냅
window.addEventListener("resize", () => {
  const nowPC = checkDevice();
  if (nowPC && !STRICT_MODE) {
    STRICT_MODE = true;
    bindStrictMode();
    container.style.scrollSnapType = 'y mandatory';
    syncIndex();
    sections[currentIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (!nowPC && STRICT_MODE) {
    STRICT_MODE = false;
    unbindStrictMode();
    container.style.scrollSnapType = 'none';
  }
});


// ===== 프로젝트 슬라이드 =====
$(function(){
  projectSlide();
});
function projectSlide(){
  var viewSwiper = new Swiper('.project-slide',{
    slidesPerView: 2,
    spaceBetween: 24,
    loop: true,
    loopAdditionalSlides : 3,
    autoHeight: true,
    speed : 500,
    allowTouchMove: true,
    autoplay:{
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  $('.project-slide').hover(
    function(){ viewSwiper.autoplay.stop(); },
    function(){ viewSwiper.autoplay.start(); }
  );
}


// ===== 카운트 숫자 =====
function countNum() {
  $('.counter').each(function() {
    var $this = $(this),
        countTo = parseInt($this.attr('data-count'));
    $({ countNum: 0 }).animate({
      countNum: countTo
    },
    {
      duration: 1500,
      easing: 'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
      }
    });
  });
}

const track = document.querySelector('.hashtag-track');
track.innerHTML += track.innerHTML;  // 내용 복제 → 두 세트로