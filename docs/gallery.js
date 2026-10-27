// The supplied ten-day route is kept as a secondary reference.
const originalDays = [
  ['LA → Redding，长途赶路', 'Redding 1 晚'],
  ['Redding → Ashland，圣诞灯饰、小镇漫步', 'Ashland 1 晚'],
  ['Ashland → Silverton 圣诞市集 → Portland', 'Portland 1 晚'],
  ['Portland → Mount Hood，赏雪、入住 Cabin', 'Mount Hood 2 晚'],
  ['圣诞节，雪山木屋、带狗玩雪', 'Mount Hood（第 2 晚）'],
  ['Mount Hood → Cannon Beach', 'Cannon Beach 1 晚'],
  ['Cannon Beach → Newport → 南部海岸', 'Newport / Florence 1 晚'],
  ['俄勒冈海岸 → Crescent City，红杉森林', 'Crescent City 1 晚'],
  ['红杉森林 → Eureka → 旧金山湾区', '湾区 1 晚'],
  ['湾区 → LA', '回家'],
];

document.querySelector('#original-rows').innerHTML = originalDays.map(([route, stay], index) =>
  `<tr><th scope="row"><b>Day ${index + 1}</b></th><td>${route}</td><td>${stay}</td></tr>`
).join('');

const photo = (file, title, author, license, caption, source) => ({
  file, title, author, license, caption,
  source: source || `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(title.replaceAll(' ', '_'))}`,
  licenseUrl: license === 'CC0' ? 'https://creativecommons.org/publicdomain/zero/1.0/'
    : license.startsWith('CC ') ? `https://creativecommons.org/licenses/${license.slice(3).toLowerCase().replace(' ', '/')}/` : '',
});

const originalStops = [
  {name:'Redding', note:'北上中转 · Sacramento River', rating:'★☆☆☆☆', duration:'休息补给', weather:'雨或阴冷', photos:[
    photo('winter-redding.jpg','Mt Shasta In the Distance With Snow On It.jpg','BMill','CC BY-SA 4.0','北加州冬季远眺 Mt Shasta · 非 Redding 市区'),
    photo('redding-bridge.jpg','Sundial Bridge, Redding, California.jpg','Vacknick','CC0','Sundial Bridge'),
    photo('redding-river.jpg','Sundial Bridge in Redding, California.jpg','Vacknick','CC0','Sundial Bridge 与河岸'),
  ]},
  {name:'Ashland', note:'小镇漫步 · 市中心', rating:'★★☆☆☆', duration:'30–60 分钟', weather:'冷雨或偶有雪', photos:[
    photo('winter-ashland.jpg','Grizzly Peak in Winter (31312086340).jpg','BLM Oregon & Washington','公共领域','Ashland 周边 Grizzly Peak 冬景'),
    photo('ashland-plaza.jpg','Ashland, Oregon - Bank of Ashland buildings (on the Plaza).jpg','Joe Mabel','CC BY-SA 4.0','Ashland Plaza'),
    photo('ashland-street.jpg','Ashland - Ashland Downtown Historic District - 20160919091339.jpg','Peterquinn925','CC BY-SA 4.0','Ashland 历史街区'),
  ]},
  {name:'Silverton', note:'圣诞市集所在小镇 · 照片并非市集现场', rating:'★★★★☆', duration:'市集 1.5–2 小时', weather:'湿冷，可能下雨', photos:[
    photo('winter-silverton.jpg','Silver Falls State Park, Oregon (32389069216).jpg','Bonnie Moreland','CC0','Silverton 附近 Silver Falls State Park 冬景'),
    photo('silverton-street.jpg','Silverton East Main 1.jpg','Samuel John Klein','CC BY-SA 3.0','Silverton East Main Street'),
    photo('silverton-downtown.jpg','Water Street buildings - Silverton Oregon.jpg','Ian Poellet','CC BY-SA 3.0','Silverton Water Street'),
  ]},
  {name:'Portland', note:'原计划住一晚', rating:'★★☆☆☆', duration:'路过或跳过', weather:'冷雨为主', photos:[
    photo('winter-portland.jpg','Snow in Southeast Portland, Oregon - February 2021 - 20.jpg','Another Believer','CC BY-SA 4.0','Portland 东南区雪景'),
    photo('portland-aerial.jpg','Portland Oregon Aerial, June 2024.jpg','Spicypepper999','CC0','Portland 城市全景'),
    photo('portland-sunrise.jpg','Portland Oregon Aerial Sunrise, June 2025.jpg','Spicypepper999','CC0','Portland 日出'),
  ]},
  {name:'Mount Hood', note:'赏雪 · Cabin 两晚', rating:'★★★★★', duration:'1 天＋2 晚', weather:'雪、冰、低温', photos:[
    photo('winter-hood.jpg','Winter Forest and Mt Hood, Mt Hood National Forest (23564671969).jpg','美国林务局','公共领域','Mount Hood 冬季雪林'),
    photo('hood-winter.jpg','White River and Mt Hood in Winter, Mt Hood National Forest (37003598396).jpg','美国林务局','公共领域','Mount Hood 冬季山景'),
    photo('hood-forest.jpg','Snow Covered Trees, Mt Hood National Forest (36795929710).jpg','美国林务局','公共领域','Mount Hood 雪林'),
  ]},
  {name:'Cannon Beach', note:'Haystack Rock · 海岸过夜', rating:'★★★★★', duration:'半天＋1 晚', weather:'多风雨，少雪', photos:[
    photo('winter-cannon.jpg','Cannon Beach 01.jpg','Postdlf','CC BY-SA 3.0','Cannon Beach 冬季海滩'),
    photo('coast-winter.jpg','Oregon Coast - Haystack Rock (13616851815).jpg','Gregory Smith','CC BY-SA 2.0','Haystack Rock 冬季海岸'),
    photo('cannon-haystack.jpg','Cannon Beach October 2019 003.jpg','King of Hearts','CC BY-SA 4.0','Cannon Beach 海滩'),
  ]},
  {name:'Newport', note:'原计划海岸停靠', rating:'★★★☆☆', duration:'短停 30–60 分钟', weather:'风雨、浪大', photos:[
    photo('winter-newport.jpg','Yaquina Head lighthouse, winter storm, Oregon (25807306508).jpg','Bonnie Moreland','公共领域','Yaquina Head 冬季风浪'),
    photo('newport-bridge.jpg','Yaquina Bay Bridge (Newport, Oregon).jpg','Visitor7','CC BY-SA 3.0','Yaquina Bay Bridge'),
    photo('newport-bay.jpg','YaquinaBridgeSpan.jpg','Cacophony','CC BY 2.5','Newport 海湾大桥'),
  ]},
  {name:'Florence', note:'海岸小镇 · 原计划住宿备选', rating:'★★★☆☆', duration:'短停 30–60 分钟', weather:'风雨、浪大', photos:[
    photo('winter-florence.jpg','Heceta Head Lighthouse - panoramio.jpg','Jim Helvey','CC BY 3.0','Florence 附近 Heceta Head 冬季海岸'),
    photo('florence-lighthouse.jpg','Heceta Head Lighthouse north of Florence, Oregon.jpg','RickObst','CC BY 4.0','Heceta Head 灯塔'),
    photo('florence-beach.jpg','Nearly empty beach at Heceta Head Lighthouse State Scenic Viewpoint.jpg','RickObst','CC BY 4.0','Heceta Head 海滩'),
  ]},
  {name:'俄勒冈南部海岸', note:'原计划继续南下 · Bandon 一带', rating:'★★★☆☆', duration:'沿途短停', weather:'风雨、浪大', photos:[
    photo('winter-bandon.jpg','Snow in Bandon Harbor, PeggyNelson (6501982559).jpg','Oregon Department of Transportation','CC BY 2.0','Bandon Harbor 冬季罕见雪景'),
    photo('south-coast-face-rock.jpg','Face Rock (Bandon, Oregon).jpg','Visitor7','CC BY-SA 3.0','Bandon Face Rock'),
    photo('south-coast-viewpoint.jpg','View from Face Rock viewpoint, Bandon, Oregon 01.jpg','Joe Mabel','CC BY-SA 4.0','Bandon 海岸观景点'),
  ]},
  {name:'Crescent City', note:'加州海岸 · 红杉林入口', rating:'★★★☆☆', duration:'短停＋1 晚', weather:'湿冷、多雨', photos:[
    photo('winter-crescent.jpg','Battery Point Lighthouse - panoramio.jpg','hakkun','CC BY-SA 3.0','Crescent City 冬季海岸与灯塔'),
    photo('crescent-lighthouse.jpg','Battery Point Lighthouse, Crescent City.jpg','Frank Schulenburg','CC BY-SA 3.0','Battery Point 灯塔'),
    photo('crescent-coast.jpg','Battery Point Lighthouse (September 2013).jpg','Frank Schulenburg','CC BY-SA 3.0','Crescent City 海岸'),
  ]},
  {name:'红杉森林', note:'Jedediah Smith / Redwood Parks', rating:'★★★★☆', duration:'2–3 小时', weather:'潮湿、可能有雨', photos:[
    photo('winter-redwoods.jpg','Coast Redwoods in Snow','NPS / Redwood National and State Parks','公共领域','Bald Hills Road 一带雪中的海岸红杉','https://www.nps.gov/media/photo/gallery-item.htm?gid=03151F2A-155D-4519-3E32-5ACD1F3E1115&id=027ECF64-155D-4519-3E8A71FE5D8E28E1'),
    photo('redwoods-fog.jpg','Redwood National Park, fog in the forest.jpg','Michael Schweppe','CC BY-SA 2.0','雾中的红杉林'),
    photo('redwoods-trail.jpg','Redwood trees on the Boy Scout Tree Trail - Flickr - chris.rycroft.jpg','Chris Rycroft','CC BY 2.0','Boy Scout Tree Trail'),
  ]},
  {name:'Eureka', note:'返程途经 · 老城区', rating:'★☆☆☆☆', duration:'休息补给', weather:'雨或阴冷', photos:[
    photo('winter-eureka.jpg','Old Town Eureka - December 2021 - Sarah Stierch.jpg','Sarah Stierch','CC BY 4.0','Eureka Old Town 冬季街景'),
    photo('eureka-old-town.jpg','Old Town Eureka, California.jpg','Pamla J. Eisenberg','CC BY 2.0','Eureka Old Town'),
    photo('eureka-clock.jpg','Eureka Old Town and Clock.jpg','Jan Kronsell','公共领域','Eureka 老城街角'),
  ]},
];

const gallery = document.querySelector('#stop-gallery');
const displayStops = [...originalStops];
displayStops.splice(4, 0, {name:'Multnomah Falls', note:'哥伦比亚河峡谷瀑布 · 补充景点', rating:'★★★☆☆', duration:'45–90 分钟', weather:'湿冷、结冰风险', photos:[
  photo('falls-winter.jpg','20190305 FS CRGNSA A frozen Multnomah Falls Bart Kicklighter.jpg','美国林务局','公共领域','冬季结冰的 Multnomah Falls'),
]});
const descriptions = {
  'Redding':'北上途中适合住宿和补给；有余暇可看 Sacramento River 旁的 Sundial Bridge。',
  'Ashland':'市中心 Plaza 与历史街区适合短暂漫步，冬季跨越 Siskiyou Pass 时以路况为先。',
  'Silverton':'圣诞市集适合夜间停留；出发前核对开放场次。照片展示小镇及周边，不是市集现场。',
  'Portland':'原始路线计划在这里过夜；城市餐饮选择多，也可按路线作为中转点。',
  'Mount Hood':'这趟旅行的雪山核心。住两晚，把完整一天留给雪景、轻量活动与木屋休息。',
  'Cannon Beach':'Haystack Rock 与冬季海浪值得留一晚，海边活动要避开高浪。',
  'Multnomah Falls':'峡谷瀑布值得短访；结冰时只去安全开放区域。',
  'Newport':'Yaquina Head 与海湾适合海岸观景，可根据天气决定停留时间。',
  'Florence':'Heceta Head 一带适合沿海观景，也可作为南下途中的住宿点。',
  '俄勒冈南部海岸':'Bandon、Gold Beach 与 Samuel H. Boardman 一带适合分段体验，留意风雨与补能。',
  'Crescent City':'Battery Point Lighthouse 与海岸可短停，也是通往 Jedediah Smith 红杉林的入口。',
  '红杉森林':'选择开放且靠近 US‑101 的短步道；雨后核对道路和步道状态。',
  'Eureka':'Old Town 街区可在返程前后短访，也适合住宿和补给。'
};
const creditMarkup = selected => `<a href="${selected.source}" target="_blank" rel="noopener">${selected.author} · 来源 ↗</a> · ${selected.licenseUrl ? `<a href="${selected.licenseUrl}" target="_blank" rel="noopener">${selected.license}</a>` : selected.license}`;
gallery.innerHTML = displayStops.map((stop, index) => {
  const first = stop.photos[0];
  return `<article class="stop-card" data-stop="${index}" data-photo="0">
    <div class="stop-card-head"><span>${String(index + 1).padStart(2, '0')} / 景点与活动</span><h4>${stop.name}</h4><p>${descriptions[stop.name]}</p></div>
    <figure class="stop-photo"><img src="assets/${first.file}" alt="${first.caption}" loading="lazy"><figcaption>${first.caption}</figcaption></figure>
    <div class="stop-controls"><button type="button" class="stop-prev" aria-label="查看 ${stop.name} 上一张照片">←</button><span class="stop-count" aria-live="polite">1 / ${stop.photos.length}</span><button type="button" class="stop-next" aria-label="查看 ${stop.name} 下一张照片">→</button></div>
    <div class="stop-details"><span class="stop-rating">推荐程度 <b aria-label="${stop.rating.split('★').length - 1} 星">${stop.rating}</b></span><span>建议停留 <b>${stop.duration}</b></span><span>天气情况 <b>${stop.weather}</b></span></div>
    <div class="stop-credit">${creditMarkup(first)}</div>
  </article>`;
}).join('');

function showStopPhoto(card, delta) {
  const stop = displayStops[Number(card.dataset.stop)];
  const nextIndex = (Number(card.dataset.photo) + delta + stop.photos.length) % stop.photos.length;
  const selected = stop.photos[nextIndex];
  card.dataset.photo = String(nextIndex);
  const img = card.querySelector('img');
  img.src = `assets/${selected.file}`;
  img.alt = selected.caption;
  card.querySelector('figcaption').textContent = selected.caption;
  card.querySelector('.stop-count').textContent = `${nextIndex + 1} / ${stop.photos.length}`;
  card.querySelector('.stop-credit').innerHTML = creditMarkup(selected);
}

gallery.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  showStopPhoto(button.closest('.stop-card'), button.classList.contains('stop-next') ? 1 : -1);
});

gallery.querySelectorAll('.stop-card').forEach(card => {
  let touchX;
  card.querySelector('.stop-photo').addEventListener('touchstart', event => {
    touchX = event.changedTouches[0].screenX;
  }, {passive:true});
  card.querySelector('.stop-photo').addEventListener('touchend', event => {
    if (touchX === undefined) return;
    const distance = event.changedTouches[0].screenX - touchX;
    if (Math.abs(distance) > 45) showStopPhoto(card, distance < 0 ? 1 : -1);
    touchX = undefined;
  }, {passive:true});
});
