const labels = {
  level: {
    easy: '쉬움',
    normal: '보통',
    hard: '어려움',
  },
  purpose: {
    portfolio: '포트폴리오용',
    growth: '실력 향상용',
    team: '팀 프로젝트용',
    fun: '재미/아이디어용',
  },
  field: {
    frontend: 'Frontend',
    backend: 'Backend',
    python: 'Python',
    ai: 'AI',
  },
};

const levelGuide = {
  easy: {
    time: '2~3일',
    scope: '핵심 기능만 작게 완성하는 버전',
    difficulty: '입문자가 구현 흐름을 잡기 좋습니다.',
  },
  normal: {
    time: '1주',
    scope: '기본 기능과 저장/필터 기능을 함께 넣는 버전',
    difficulty: '수업 과제와 포트폴리오 사이에서 균형이 좋습니다.',
  },
  hard: {
    time: '2주 이상',
    scope: '로그인, 데이터 관리, 통계까지 확장하는 버전',
    difficulty: '구현 난이도는 있지만 완성하면 설명할 거리가 많습니다.',
  },
};

const fieldTech = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
  backend: ['Node.js', 'Express', 'Database', 'REST API'],
  python: ['Python', 'CSV', '자동화', '데이터 처리'],
  ai: ['JavaScript', 'Prompt Design', 'AI API', 'LocalStorage'],
};

const ideaTitles = {
  frontend: {
    portfolio: [
      '인터랙티브 포트폴리오 섹션 빌더',
      '프로젝트 카드 쇼케이스 생성기',
      '개발자 소개 페이지 테마 메이커',
    ],
    growth: [
      'JavaScript DOM 미션 트레이너',
      '반응형 레이아웃 연습 보드',
      '웹 컴포넌트 UI 실험실',
    ],
    team: [
      '팀 역할 랜덤 배정판',
      '팀 회의록 카드 보드',
      '팀 프로젝트 진행률 대시보드',
    ],
    fun: [
      '랜덤 점심 메뉴 룰렛',
      '오늘의 공부 주제 뽑기',
      '미니 사다리타기 게임',
    ],
  },
  backend: {
    portfolio: [
      '스터디 모집 게시판 API',
      '문의 관리 미니 CRM',
      '개인 프로젝트 기록 백엔드',
    ],
    growth: [
      'REST API 연습용 할 일 서버',
      '로그인 인증 실습 서버',
      '파일 업로드 관리 API',
    ],
    team: [
      '팀 일정 공유 API',
      '역할 분담 투표 서버',
      '팀 이슈 관리 백엔드',
    ],
    fun: [
      '랜덤 메뉴 추천 API',
      '퀴즈 문제 출제 서버',
      '닉네임 생성기 API',
    ],
  },
  python: {
    portfolio: [
      'CSV 가계부 분석 리포트',
      '깃허브 활동 요약 자동화',
      '학습 기록 데이터 시각화',
    ],
    growth: [
      '다운로드 폴더 자동 정리기',
      '텍스트 파일 요약 카운터',
      '파이썬 알고리즘 문제 타이머',
    ],
    team: [
      '팀 발표 순서 랜덤 추첨기',
      '팀 자료 파일명 정리 도구',
      '팀 과제 체크리스트 생성기',
    ],
    fun: [
      '운세 문장 랜덤 생성기',
      '간단한 콘솔 RPG 미션',
      '오늘의 메뉴 데이터 분석기',
    ],
  },
  ai: {
    portfolio: [
      'AI 면접 질문 연습기',
      '프롬프트 보관함 웹앱',
      '자기소개 문장 개선 도구',
    ],
    growth: [
      '프롬프트 품질 체크리스트',
      'AI 학습 계획 추천기',
      '질문 답변 복습 노트',
    ],
    team: [
      '팀 아이디어 브레인스토밍 도우미',
      '회의 내용 요약 도구',
      '역할별 작업 문장 생성기',
    ],
    fun: [
      'AI 밈 문구 생성기',
      '랜덤 소설 첫 문장 추천기',
      '오늘의 프로젝트 이름 생성기',
    ],
  },
};

const selected = {
  level: 'easy',
  purpose: 'portfolio',
  field: 'frontend',
};

const optionGroups = document.querySelectorAll('.option-group');
const pickButton = document.getElementById('pickButton');
const drawBox = document.getElementById('drawBox');
const drawTrack = document.getElementById('drawTrack');
const resultBox = document.getElementById('recommendResult');
const savedList = document.getElementById('savedList');
const conditionHistory = new Map();
let currentIdea = null;
let expandedSavedTitle = '';

function createProjectIdeas() {
  const ideas = [];

  Object.keys(ideaTitles).forEach((field) => {
    Object.keys(ideaTitles[field]).forEach((purpose) => {
      Object.keys(levelGuide).forEach((level) => {
        ideaTitles[field][purpose].forEach((title, index) => {
          ideas.push({
            id: `${field}-${purpose}-${level}-${index}`,
            title,
            level,
            purpose,
            field,
            tech: fieldTech[field],
            time: levelGuide[level].time,
            summary: `${labels.purpose[purpose]}으로 활용하기 좋은 ${labels.field[field]} 프로젝트입니다. ${levelGuide[level].scope}으로 만들면 부담 없이 완성도를 보여줄 수 있습니다.`,
            reason: `${labels.level[level]} 난이도에 맞춰 기능 범위를 조절하기 쉽고, ${levelGuide[level].difficulty}`,
            advice: getAdvice(field, purpose, level),
          });
        });
      });
    });
  });

  return ideas;
}

function getAdvice(field, purpose, level) {
  const fieldAdvice = {
    frontend:
      '현재 포트폴리오 사이트에서 사용한 HTML, CSS, JavaScript 구조를 다시 보면서 DOM 조작과 반응형 레이아웃을 조금 더 연습하고 시작하면 좋습니다.',
    backend:
      '기존 프로젝트를 정리한 경험을 바탕으로 데이터가 저장되고 수정되는 흐름을 먼저 설계해보면 좋습니다. 시작 전에는 CRUD, 라우팅, 데이터베이스 기본 구조를 조금 더 공부하면 수월합니다.',
    python:
      '학습 기록이나 프로젝트 자료를 다뤘던 경험을 활용해서 파일 처리와 데이터 정리 흐름을 먼저 연습하면 좋습니다. 시작 전에는 리스트, 딕셔너리, 파일 입출력을 다시 보면 도움이 됩니다.',
    ai:
      '포트폴리오와 블로그에 정리한 학습 내용을 활용해서 어떤 입력을 받으면 좋은 결과가 나오는지 먼저 정리해보면 좋습니다. 시작 전에는 프롬프트 작성 방식과 결과 저장 흐름을 공부하면 좋습니다.',
  };

  const purposeAdvice = {
    portfolio:
      '포트폴리오용이라면 완성 화면뿐 아니라 기획 이유, 구현 과정, 어려웠던 점까지 같이 정리해두면 발표할 때 더 좋아 보입니다.',
    growth:
      '실력 향상용이라면 기능을 한 번에 크게 만들기보다 작은 기능을 완성하고 다음 기능을 붙이는 방식으로 진행하는 것을 추천합니다.',
    team:
      '팀 프로젝트용이라면 역할 분담표와 공통 디자인 규칙을 먼저 정하고 시작하면 작업이 덜 꼬입니다.',
    fun:
      '재미있는 주제일수록 버튼을 눌렀을 때 결과가 바로 보이도록 만들면 수업 발표에서 반응이 좋습니다.',
  };

  return `${fieldAdvice[field]} ${purposeAdvice[purpose]} ${levelGuide[level].difficulty}`;
}

const projectIdeas = createProjectIdeas();

function getConditionKey() {
  return `${selected.field}-${selected.purpose}-${selected.level}`;
}

function getCandidates() {
  return projectIdeas.filter(
    (idea) =>
      idea.field === selected.field &&
      idea.purpose === selected.purpose &&
      idea.level === selected.level,
  );
}

function pickIdea() {
  const key = getConditionKey();
  const candidates = getCandidates();
  const usedTitles = conditionHistory.get(key) || [];
  let available = candidates.filter((idea) => !usedTitles.includes(idea.title));

  if (available.length === 0) {
    available = candidates;
    conditionHistory.set(key, []);
  }

  const idea = available[Math.floor(Math.random() * available.length)];
  const nextHistory = [...(conditionHistory.get(key) || []), idea.title].slice(-candidates.length);
  conditionHistory.set(key, nextHistory);

  return idea;
}

function renderIdeaCard(idea, options = {}) {
  const saveButton = options.includeSave
    ? '<button id="saveIdea" class="btn result-save-btn" type="button">찜하기</button>'
    : '';

  const advice = idea.advice || getAdvice(idea.field, idea.purpose || 'portfolio', idea.level);

  return `
    <span class="result-label">${labels.field[idea.field]} 추천</span>
    <h2>${idea.title}</h2>
    <p>${idea.summary}</p>
    <div class="result-meta">
      <span><strong>난이도</strong>${labels.level[idea.level]}</span>
      <span><strong>일수</strong>${idea.time}</span>
      <span><strong>기술스택</strong>${idea.tech.join(' / ')}</span>
    </div>
    <div class="result-reason">
      <strong>추천 이유와 공부 방향</strong>
      <p>${advice}</p>
    </div>
    ${saveButton}
  `;
}

function renderResult(idea) {
  currentIdea = idea;
  resultBox.innerHTML = renderIdeaCard(idea, { includeSave: true });
  document.getElementById('saveIdea').addEventListener('click', saveCurrentIdea);
}

function runDraw() {
  pickButton.disabled = true;
  drawBox.classList.add('drawing');
  drawTrack.textContent = '추천 후보를 고르는 중...';

  window.setTimeout(() => {
    const idea = pickIdea();
    drawBox.classList.remove('drawing');
    drawTrack.textContent = '추천이 완료되었습니다.';
    renderResult(idea);
    pickButton.disabled = false;
  }, 850);
}

function getSavedIdeas() {
  const saved = JSON.parse(localStorage.getItem('savedProjectIdeas') || '[]');
  const normalized = saved.map(normalizeSavedIdea).filter(Boolean);

  if (JSON.stringify(saved) !== JSON.stringify(normalized)) {
    setSavedIdeas(normalized);
  }

  return normalized;
}

function setSavedIdeas(saved) {
  localStorage.setItem('savedProjectIdeas', JSON.stringify(saved));
}

function normalizeSavedIdea(idea) {
  if (!idea || !idea.title) return null;

  const matched = projectIdeas.find((project) => project.title === idea.title);
  const field = idea.field || matched?.field || 'frontend';
  const rawPurpose = idea.purpose || matched?.purpose || 'portfolio';
  const purpose = Array.isArray(rawPurpose) ? rawPurpose[0] : rawPurpose;
  const level = idea.level || matched?.level || 'easy';
  const id = idea.id || matched?.id || `${field}-${purpose}-${level}-${idea.title}`;

  return {
    ...matched,
    ...idea,
    id,
    field,
    purpose,
    level,
    tech: idea.tech || matched?.tech || fieldTech[field],
    time: idea.time || matched?.time || levelGuide[level].time,
    summary:
      idea.summary ||
      matched?.summary ||
      `${labels.purpose[purpose]}으로 활용하기 좋은 ${labels.field[field]} 프로젝트입니다.`,
    advice: idea.advice || matched?.advice || getAdvice(field, purpose, level),
  };
}

function saveCurrentIdea() {
  if (!currentIdea) return;

  const saved = getSavedIdeas();
  if (!saved.some((idea) => idea.title === currentIdea.title && idea.id === currentIdea.id)) {
    saved.unshift(currentIdea);
    setSavedIdeas(saved.slice(0, 12));
  }

  expandedSavedTitle = currentIdea.id;
  renderSaved();
}

function removeSavedIdea(id) {
  const saved = getSavedIdeas().filter((idea) => String(idea.id) !== String(id));
  setSavedIdeas(saved);

  if (expandedSavedTitle === id) {
    expandedSavedTitle = '';
  }

  renderSaved();
}

function toggleSavedIdea(id) {
  expandedSavedTitle = String(expandedSavedTitle) === String(id) ? '' : id;
  renderSaved();
}

function renderSaved() {
  const saved = getSavedIdeas();

  if (saved.length === 0) {
    savedList.innerHTML = '<p class="empty-saved">아직 저장한 추천이 없습니다.</p>';
    return;
  }

  savedList.innerHTML = saved
    .map((idea) => {
      const expanded = String(expandedSavedTitle) === String(idea.id);
      return `
        <article class="saved-card ${expanded ? 'expanded' : ''}" data-id="${idea.id}">
          <button class="saved-summary" type="button" data-action="toggle" data-id="${idea.id}">
            <span>
              <strong>${idea.title}</strong>
              <small>${labels.field[idea.field]} · ${labels.level[idea.level]} · ${idea.time}</small>
            </span>
            <em>${expanded ? '접기' : '펴기'}</em>
          </button>
          ${
            expanded
              ? `
                <div class="saved-detail">
                  ${renderIdeaCard(idea)}
                  <button class="saved-delete-btn" type="button" data-action="remove" data-id="${idea.id}">
                    이 추천 삭제
                  </button>
                </div>
              `
              : ''
          }
        </article>
      `;
    })
    .join('');
}

optionGroups.forEach((group) => {
  group.addEventListener('click', (event) => {
    const button = event.target.closest('.option-btn');
    if (!button) return;

    const optionName = group.dataset.optionGroup;
    selected[optionName] = button.dataset.value;

    group.querySelectorAll('.option-btn').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    drawTrack.textContent = '시작 대기중';
  });
});

pickButton.addEventListener('click', runDraw);

savedList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;

  if (action === 'remove') {
    removeSavedIdea(id);
    return;
  }

  toggleSavedIdea(id);
});

renderSaved();
