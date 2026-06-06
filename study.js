const defaultTopics = [
  {
    id: 'bandit',
    title: 'OverTheWire Bandit',
    category: 'wargame',
    desc: 'Linux 명령어, 권한, SSH 사용법을 문제 풀이로 기록합니다.',
    createdAt: '2026-06-03',
    entries: [
      {
        id: 'bandit-1',
        type: '문제 풀이',
        title: 'Level 0 -> 1 풀이',
        content: 'SSH 접속 방법과 readme 파일에서 비밀번호를 확인하는 과정을 정리합니다.',
        createdAt: '2026-06-03',
      },
      {
        id: 'bandit-2',
        type: '문제 풀이',
        title: 'Level 1 -> 2 풀이',
        content: '특수문자가 포함된 파일명을 읽는 방법을 정리합니다.',
        createdAt: '2026-06-03',
      },
    ],
  },
  {
    id: 'dreamhack',
    title: 'Dreamhack',
    category: 'wargame',
    desc: '웹해킹, 시스템해킹, 암호학 문제 풀이 과정을 기록합니다.',
    createdAt: '2026-06-03',
    entries: [
      {
        id: 'dreamhack-1',
        type: '문제 풀이',
        title: '웹해킹 입문 문제 정리',
        content: '문제 의도, 사용한 취약점, 풀이 흐름을 나눠 정리합니다.',
        createdAt: '2026-06-03',
      },
    ],
  },
  {
    id: 'linux',
    title: 'Linux 공부',
    category: 'language',
    desc: '명령어, 파일 권한, 프로세스, 네트워크 이론을 정리합니다.',
    createdAt: '2026-06-03',
    entries: [
      {
        id: 'linux-1',
        type: '이론 정리',
        title: '파일 권한 chmod 정리',
        content: 'rwx 권한과 숫자 표기법을 예시로 정리합니다.',
        createdAt: '2026-06-03',
      },
    ],
  },
  {
    id: 'sqld',
    title: 'SQLD',
    category: 'certificate',
    desc: 'SQLD 개념 정리와 기출 문제 풀이 기록을 관리합니다.',
    createdAt: '2026-06-03',
    entries: [
      {
        id: 'sqld-1',
        type: '자격증',
        title: '데이터 모델링 개념 정리',
        content: '엔터티, 속성, 관계 개념을 정리합니다.',
        createdAt: '2026-06-03',
      },
    ],
  },
];

const categoryLabels = {
  all: '전체',
  wargame: '문제 풀이',
  certificate: '자격증',
  language: '언어/OS',
};

const studySummary = document.getElementById('studySummary');
const studyGrid = document.getElementById('studyGrid');
const studyFilter = document.getElementById('studyFilter');
const studyListView = document.getElementById('studyListView');
const studyDetailView = document.getElementById('studyDetailView');
const toggleTopicForm = document.getElementById('toggleTopicForm');
const topicForm = document.getElementById('topicForm');
const topicTitle = document.getElementById('topicTitle');
const topicCategory = document.getElementById('topicCategory');
const topicDesc = document.getElementById('topicDesc');
let activeCategory = 'all';
let activeTopicId = '';
let activeEntryId = '';
let entrySearchText = '';

function todayText() {
  return new Date().toISOString().slice(0, 10);
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeTopics(topics) {
  return topics
    .filter((topic) => topic && topic.title)
    .map((topic) => ({
      id: topic.id || makeId('topic'),
      title: topic.title,
      category: topic.category === 'security' ? 'wargame' : topic.category || 'wargame',
      desc: topic.desc || '학습 기록을 정리하는 목록입니다.',
      createdAt: topic.createdAt || todayText(),
      entries: (topic.entries || []).map((entry) => ({
        id: entry.id || makeId('entry'),
        type: entry.type || '기록',
        title: entry.title || '제목 없는 기록',
        content: entry.content || '내용을 추가로 정리할 예정입니다.',
        image: entry.image || '',
        createdAt: entry.createdAt || todayText(),
      })),
    }));
}

function readImageFile(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

function getTopics() {
  const saved = JSON.parse(localStorage.getItem('securityStudyTopics') || 'null');
  const topics = normalizeTopics(saved || defaultTopics);
  localStorage.setItem('securityStudyTopics', JSON.stringify(topics));
  return topics;
}

function setTopics(topics) {
  localStorage.setItem('securityStudyTopics', JSON.stringify(normalizeTopics(topics)));
}

function getFirstTopicDate(topics) {
  const dates = topics.map((topic) => topic.createdAt).filter(Boolean);
  return dates.length ? dates.sort()[0] : todayText();
}

function getTopicLastActivity(topic) {
  const dates = [topic.createdAt, ...topic.entries.map((entry) => entry.createdAt)].filter(Boolean);
  return dates.length ? dates.sort().at(-1) : topic.createdAt;
}

function getLatestTopicTitle(topics) {
  if (!topics.length) return '아직 없음';
  return [...topics].sort((a, b) => getTopicLastActivity(b).localeCompare(getTopicLastActivity(a)))[0]
    .title;
}

function getLatestEntryTitle(topic) {
  if (!topic.entries.length) return '아직 없음';
  return [...topic.entries].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0].title;
}

function renderListSummary() {
  const topics = getTopics();

  studySummary.innerHTML = `
    <article class="study-summary-card">
      <strong>${getFirstTopicDate(topics)}</strong>
      <span>시작일</span>
    </article>
    <article class="study-summary-card">
      <strong>${topics.length}개</strong>
      <span>작성 기록</span>
    </article>
    <article class="study-summary-card">
      <strong>${getLatestTopicTitle(topics)}</strong>
      <span>최근 활동</span>
    </article>
  `;
}

function renderDetailSummary(topic) {
  studySummary.innerHTML = `
    <article class="study-summary-card">
      <strong>${topic.createdAt}</strong>
      <span>시작일</span>
    </article>
    <article class="study-summary-card">
      <strong>${topic.entries.length}개</strong>
      <span>작성 기록</span>
    </article>
    <article class="study-summary-card">
      <strong>${getLatestEntryTitle(topic)}</strong>
      <span>최근 기록</span>
    </article>
  `;
}

function renderTopicCards() {
  const topics = getTopics().filter(
    (topic) => activeCategory === 'all' || topic.category === activeCategory,
  );

  if (topics.length === 0) {
    studyGrid.innerHTML = '<p class="empty-saved">표시할 학습 목록이 없습니다.</p>';
    return;
  }

  studyGrid.innerHTML = topics
    .map(
      (topic) => `
        <article class="study-card study-topic-card" data-id="${topic.id}">
          <button class="study-topic-open" type="button" data-action="open" data-id="${topic.id}">
            <div class="study-card-head">
              <div>
                <span class="result-label">${categoryLabels[topic.category]}</span>
                <h2>${topic.title}</h2>
              </div>
            </div>
            <p>${topic.desc}</p>
            <div class="study-topic-meta">
              <span>시작일 ${topic.createdAt}</span>
              <span>기록 ${topic.entries.length}개</span>
            </div>
          </button>
          <button class="study-topic-delete" type="button" data-action="delete-topic" data-id="${topic.id}">
            삭제
          </button>
        </article>
      `,
    )
    .join('');
}

function getFilteredEntries(topic) {
  const keyword = entrySearchText.trim().toLowerCase();
  if (!keyword) return topic.entries;
  return topic.entries.filter((entry) => entry.title.toLowerCase().includes(keyword));
}

function renderDetail(topicId) {
  const topic = getTopics().find((item) => item.id === topicId);
  if (!topic) {
    showList();
    return;
  }

  activeTopicId = topicId;
  studyListView.hidden = true;
  studyDetailView.hidden = false;
  renderDetailSummary(topic);

  const filteredEntries = getFilteredEntries(topic);
  studyDetailView.innerHTML = `
    <div class="study-detail-top">
      <button id="backToStudyList" class="btn" type="button">목록으로</button>
      <button id="deleteCurrentTopic" class="saved-delete-btn study-reset-btn" type="button">
        이 목록 삭제
      </button>
    </div>

    <article class="study-detail-hero">
      <span class="result-label">${categoryLabels[topic.category]}</span>
      <h2>${topic.title}</h2>
      <p>${topic.desc}</p>
      <div class="study-topic-meta">
        <span>시작일 ${topic.createdAt}</span>
        <span>작성 기록 ${topic.entries.length}개</span>
      </div>
    </article>

    <form id="entryForm" class="study-entry-form">
      <div class="study-form-grid">
        <label>
          기록 종류
          <select id="entryType">
            <option value="문제 풀이">문제 풀이</option>
            <option value="이론 정리">이론 정리</option>
            <option value="자격증">자격증</option>
            <option value="실습 기록">실습 기록</option>
          </select>
        </label>
        <label>
          제목
          <input id="entryTitle" type="text" placeholder="예: Level 3 -> 4 풀이" />
        </label>
      </div>
      <label>
        내용
        <textarea id="entryContent" placeholder="풀이 과정, 사용한 명령어, 알게 된 점을 적어두세요."></textarea>
      </label>
      <label class="study-image-label">
        이미지
        <input id="entryImage" type="file" accept="image/*" />
      </label>
      <button class="btn primary" type="submit">기록 추가</button>
    </form>

    <div class="study-entry-search">
      <input
        id="entrySearchInput"
        type="search"
        value="${entrySearchText}"
        placeholder="기록 제목 검색"
        autocomplete="off"
      />
    </div>

    <section class="study-entry-list">
      ${
        filteredEntries.length
          ? filteredEntries
              .map(
                (entry, index) => `
                  <article class="study-entry-card ${activeEntryId === entry.id ? 'expanded' : ''}">
                    <button class="study-entry-summary" type="button" data-action="toggle-entry" data-id="${entry.id}">
                      <span>
                        <em>${entry.type}</em>
                        <strong>${index + 1}. ${entry.title}</strong>
                        <small>${entry.createdAt}</small>
                      </span>
                      <b>${activeEntryId === entry.id ? '접기' : '펼치기'}</b>
                    </button>
                    ${
                      activeEntryId === entry.id
                        ? `
                          <div class="study-entry-body">
                            <p>${entry.content}</p>
                            ${
                              entry.image
                                ? `<img class="study-entry-image" src="${entry.image}" alt="${entry.title} 이미지">`
                                : ''
                            }
                            <button class="study-entry-delete" type="button" data-action="delete-entry" data-id="${entry.id}">
                              기록 삭제
                            </button>
                          </div>
                        `
                        : ''
                    }
                  </article>
                `,
              )
              .join('')
          : '<p class="empty-saved">검색 결과가 없습니다.</p>'
      }
    </section>
  `;

  const searchInput = document.getElementById('entrySearchInput');
  if (searchInput) {
    searchInput.focus();
    searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
  }
}

function showList() {
  activeTopicId = '';
  activeEntryId = '';
  entrySearchText = '';
  studyListView.hidden = false;
  studyDetailView.hidden = true;
  renderListSummary();
  renderTopicCards();
}

function addTopic(event) {
  event.preventDefault();
  const title = topicTitle.value.trim();
  if (!title) return;

  const topics = getTopics();
  topics.unshift({
    id: makeId('topic'),
    title,
    category: topicCategory.value,
    desc: topicDesc.value.trim() || '학습 기록을 정리하는 목록입니다.',
    createdAt: todayText(),
    entries: [],
  });
  setTopics(topics);

  topicForm.reset();
  topicForm.classList.remove('show');
  renderListSummary();
  renderTopicCards();
}

function deleteTopic(topicId) {
  const topics = getTopics().filter((topic) => topic.id !== topicId);
  setTopics(topics);
  showList();
}

async function addEntry(event) {
  event.preventDefault();
  const entryType = document.getElementById('entryType');
  const entryTitle = document.getElementById('entryTitle');
  const entryContent = document.getElementById('entryContent');
  const entryImage = document.getElementById('entryImage');
  const title = entryTitle.value.trim();

  if (!title) return;

  const imageData = await readImageFile(entryImage.files[0]);
  const topics = getTopics();
  const topic = topics.find((item) => item.id === activeTopicId);
  topic.entries.unshift({
    id: makeId('entry'),
    type: entryType.value,
    title,
    content: entryContent.value.trim() || '내용을 추가로 정리할 예정입니다.',
    image: imageData,
    createdAt: todayText(),
  });
  setTopics(topics);
  activeEntryId = topic.entries[0].id;
  entrySearchText = '';
  renderDetail(activeTopicId);
}

function deleteEntry(entryId) {
  const topics = getTopics();
  const topic = topics.find((item) => item.id === activeTopicId);
  topic.entries = topic.entries.filter((entry) => entry.id !== entryId);
  setTopics(topics);
  if (activeEntryId === entryId) activeEntryId = '';
  renderDetail(activeTopicId);
}

studyFilter.addEventListener('click', (event) => {
  const button = event.target.closest('.study-filter-btn');
  if (!button) return;

  activeCategory = button.dataset.category;
  studyFilter.querySelectorAll('.study-filter-btn').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  renderTopicCards();
});

studyGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  if (button.dataset.action === 'open') {
    entrySearchText = '';
    activeEntryId = '';
    renderDetail(button.dataset.id);
    return;
  }

  deleteTopic(button.dataset.id);
});

studyDetailView.addEventListener('click', (event) => {
  const backButton = event.target.closest('#backToStudyList');
  const deleteCurrentButton = event.target.closest('#deleteCurrentTopic');
  const actionButton = event.target.closest('button[data-action]');

  if (backButton) showList();
  if (deleteCurrentButton) deleteTopic(activeTopicId);
  if (!actionButton) return;

  if (actionButton.dataset.action === 'delete-entry') {
    deleteEntry(actionButton.dataset.id);
    return;
  }

  if (actionButton.dataset.action === 'toggle-entry') {
    activeEntryId = activeEntryId === actionButton.dataset.id ? '' : actionButton.dataset.id;
    renderDetail(activeTopicId);
  }
});

studyDetailView.addEventListener('input', (event) => {
  if (event.target.id !== 'entrySearchInput') return;
  entrySearchText = event.target.value;
  activeEntryId = '';
  renderDetail(activeTopicId);
});

studyDetailView.addEventListener('submit', (event) => {
  if (event.target.id === 'entryForm') addEntry(event);
});

toggleTopicForm.addEventListener('click', () => {
  topicForm.classList.toggle('show');
});

topicForm.addEventListener('submit', addTopic);

studyDetailView.hidden = true;
renderListSummary();
renderTopicCards();
