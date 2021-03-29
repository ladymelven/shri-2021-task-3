const mod = (alias, data) => {
    if (alias !== 'leaders') { return '' }

    if (window.innerWidth < 481 &&
      data.selectedUserId &&
      data.users.findIndex(user => user.id === data.selectedUserId)) {
        return 'with-chosen';
    }
}

const setImage = (parent, selectorClass, id, avatar, name) => {
    const image = parent.querySelector(`.${selectorClass}`);

    image.srcset = `assets/images/${id}.jpg 1.5x, assets/images/${avatar}`;
    image.src = `assets/images/${avatar}`;
    image.alt = name;
}

const setLeader = (userData, place) => {
    const unit = document.createElement('div');
    unit.classList.add('leaders__unit');
    unit.innerHTML = `
      <div class="leaders__user">
        <span class="emoji leaders__emoji"></span>
        <img class="userpic leaders__userpic" src="" alt="">
        <p class="leaders__name"></p>
        <p class="leaders__number caption pale"></p>
      </div>
      <div class="leaders__column"></div>
  `;
    //задаем картиночку
    setImage(unit, 'leaders__userpic', userData.id, userData.avatar, userData.name);

    //задаем имя, статы и место
    unit.querySelector('.leaders__name').innerHTML = userData.name.split(' ').join('<br>');
    unit.querySelector('.leaders__number').innerHTML = userData.valueText;
    unit.querySelector('.leaders__column').innerHTML = place;

    return unit;
}

const renderLeaders = (data) => {
    const container = document.createElement('div');
    let numLeaders = 3;

    if (window.innerWidth > 480 && window.innerWidth < 1024) {
        numLeaders = data.users.length < 5 ? data.users.length : 5;
    } else if (window.innerWidth > 1023 && window.innerWidth < 1920) {
        numLeaders = data.users.length < 7 ? data.users.length : 7;
    } else if (window.innerWidth > 1919) {
        numLeaders = data.users.length < 9 ? data.users.length : 9;
    }

    for (let i = 0; i < numLeaders; i++) {
        const leaderCard = setLeader(data.users[i], `${i + 1}`);

        if (data.selectedUserId &&  data.selectedUserId === data.users[i].id) {
            leaderCard.querySelector('.leaders__emoji').innerHTML = '👍';
        }

        if (i === 0) {
            leaderCard.querySelector('.leaders__emoji').innerHTML += `${data.emoji}`;
            leaderCard.querySelector('.leaders__column').classList.add('leaders__column_bright');
            container.appendChild(leaderCard);
        } else {
            leaderCard.classList.add(`leaders__unit_top${i + 1}`)
            if ( i % 2 === 1) {
                leaderCard.classList.add('leaders__unit_right');
                container.appendChild(leaderCard);
            } else {
                leaderCard.classList.add('leaders__unit_left');
                container.prepend(leaderCard);
            }
        }
    }

    if (data.selectedUserId) {
        const index = data.users.findIndex(unit => unit.id === data.selectedUserId);

        if (index > numLeaders && window.innerWidth < 481) {
            const chosenCard = document.createElement('div');
            chosenCard.className = 'leaders__user leaders__user_chosen';
            chosenCard.innerHTML = `
        <span class="emoji leaders__emoji">👍</span>
        <img class="userpic leaders__userpic" src="" alt="">
        <p class="leaders__name">${data.users[index].name}</p>
        <p class="leaders__number caption">${data.users[index].valueText}</p>
        <p class="leaders__position">${index + 1}</p>
      `;
            setImage(chosenCard, 'leaders__userpic', data.users[index].id, data.users[index].avatar, data.users[index].name);

            container.appendChild(chosenCard);
        }
    }

    return container.innerHTML;
}

const renderVote = (data) => {
    const container = document.createElement('div');

    container.innerHTML = `
    <button class="vote__button vote__button_up" id="button-up">
      <svg>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z" fill=""/>
      </svg>
    </button>
    <button class="vote__button vote__button_down" id="button-down">
      <svg>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64ZM59 32C59 46.9117 46.9117 59 32 59C17.0883 59 5 46.9117 5 32C5 17.0883 17.0883 5 32 5C46.9117 5 59 17.0883 59 32ZM25.0607 27.9393C24.4749 27.3536 23.5251 27.3536 22.9393 27.9393C22.3536 28.5251 22.3536 29.4749 22.9393 30.0607L30.9393 38.0607C31.5251 38.6464 32.4749 38.6464 33.0607 38.0607L41.0607 30.0607C41.6464 29.4749 41.6464 28.5251 41.0607 27.9393C40.4749 27.3536 39.5251 27.3536 38.9393 27.9393L32 34.8787L25.0607 27.9393Z" fill=""/>
      </svg>
    </button>
  `;

    let minNum = 0;
    let maxNum = window.innerWidth > 480 && window.innerWidth < 768 ? 6 : 8;

    if (data.offset) {
        minNum = data.users.findIndex(user => user.id === data.offset);
        maxNum = minNum + maxNum;

        if (minNum) {
            const offsetIndex = minNum - maxNum > 0 ? minNum - maxNum : 0;
            container.querySelector('#button-up').setAttribute('data-action', 'update');
            container.querySelector('#button-up').setAttribute(
              'data-params',
              JSON.stringify({
                  alias: 'vote',
                  data: {
                      offset: data.users[offsetIndex].id
                  }
              })
            );
        } else {
            container.querySelector('#button-up').disabled = true;
        }

        if (minNum + maxNum >= data.users.length) {
            container.querySelector('#button-down').disabled = true;
        } else {
            container.querySelector('#button-down').setAttribute('data-action', 'update');
            container.querySelector('#button-down').setAttribute(
              'data-params',
              JSON.stringify({
                  alias: 'vote',
                  data: {
                      offset: data.users[maxNum].id
                  }
              })
            );
        }
    } else {
        container.querySelector('#button-up').disabled = true;

        // edge case: даты может прийти только на один экран
        if (maxNum >= data.users.length) {
            container.querySelector('#button-down').disabled = true;
        } else {
            container.querySelector('#button-down').setAttribute('data-action', 'update');
            container.querySelector('#button-down').setAttribute(
              'data-params',
              JSON.stringify({
                  alias: 'vote',
                  data: {
                      offset: data.users[maxNum].id
                  }
              })
            );
        }
    }

    for (let i = minNum; i < maxNum; i++) {
        const userData = data.users[i];
        if (!data.users[i]) { break }

        const userCard = document.createElement('div');
        userCard.className = 'card vote__card';
        userCard.innerHTML = `
      <img 
        srcset="assets/images/${userData.id}.jpg 1.5x, assets/images/${userData.avatar}" 
        src="assets/images/${userData.avatar}" alt="${userData.name}" 
        class="userpic card__userpic">
      <p class="card__name">${userData.name}</p>
    `;

        if (data.selectedUserId && data.selectedUserId === userData.id) {
            const emoji = document.createElement('span');
            emoji.classList.add('emoji');
            emoji.classList.add('card__emoji');
            emoji.innerHTML = '👍';
            userCard.appendChild(emoji);
            userCard.classList.add('card_chosen');
        } else {
            userCard.setAttribute('data-action', 'update');
            userCard.setAttribute(
              'data-params',
              JSON.stringify({
                  alias: 'leaders',
                  data: {
                      selectedUserId: userData.id
                  }
              })
            );
        }

        container.appendChild(userCard);
    }

    return container.innerHTML;
}

const renderChart = (data) => {
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="chart__chart"></div>
    <div class="chart__leaders"></div>
  `;

    const chart = container.querySelector('.chart__chart');
    const leaders = container.querySelector('.chart__leaders');
    const activeIndex = data.values.findIndex(value => value.active);
    let minIndex = activeIndex - 6;
    let maxIndex = activeIndex + 2;

    if (window.innerWidth > 767 && window.innerWidth < 1024) {
        minIndex = activeIndex - 7 > 0 ? activeIndex - 7 : 0;
    } else if (window.innerWidth > 1023 && window.innerWidth < 1366) {
        minIndex = activeIndex - 8 > 0 ? activeIndex - 8 : 0;
        maxIndex = activeIndex + 3 < data.values.length ? activeIndex + 3 : data.values.length;
    } else if (window.innerWidth > 1365 && window.innerWidth < 1920) {
        minIndex = activeIndex - 12 > 0 ? activeIndex - 12 : 0;
        maxIndex = activeIndex + 3 < data.values.length ? activeIndex + 3 : data.values.length;
    } else if (window.innerWidth > 1919) {
        minIndex = activeIndex - 14 > 0 ? activeIndex - 14 : 0;
        maxIndex = activeIndex + 3 < data.values.length ? activeIndex + 3 : data.values.length;
    }

    let maxValue = 0;

    for (let i = minIndex; i <= maxIndex; i++) {
        if (data.values[i].value > maxValue) {
            maxValue = data.values[i].value;
        }
    }

    for (let i = minIndex; i <= maxIndex; i++) {
        const dataUnit = data.values[i];
        const bar = document.createElement('div');
        bar.className = 'chart__unit';
        bar.innerHTML = `
      <p class="chart__number subtitle pale">${dataUnit.value ? dataUnit.value : ''}</p>
      <div class="chart__bar"></div>
      <p class="chart__legend pale">${dataUnit.title}</p>
    `;
        bar.style.height = 70 * (dataUnit.value / maxValue) + '%';

        if (i === activeIndex) {
            bar.querySelector('.chart__number').classList.remove('pale');
            bar.querySelector('.chart__bar').classList.add('chart__bar_current');
        }

        chart.appendChild(bar);
    }

    data.users.forEach((user, index) => {
        if (window.innerWidth < 1366 && index === 2) { return; }

        const userData = data.users[index];
        const userCard = document.createElement('div');
        userCard.className = 'chart__leader';
        userCard.innerHTML = `
      <img srcset=""
           src=""
           alt=""
           class="userpic userpic_mini chart__userpic">
      <div class="chart__text">
        <p class="chart__leader-name">${userData.name}</p>
        <p class="caption pale">${userData.valueText}</p>
      </div>
    `;
        setImage(userCard, 'chart__userpic', userData.id, userData.avatar, userData.name);

        leaders.appendChild(userCard);
    });

    return container.innerHTML;
}

function arc(startAngle, endAngle, outerRadius, innerRadius = 0) {
    const sinAlpha = Math.sin(startAngle);
    const cosAlpha = Math.cos(startAngle);
    const sinBeta = Math.sin(endAngle);
    const cosBeta = Math.cos(endAngle);

    const largeArc = endAngle - startAngle > Math.PI;

    const P = {
        x: outerRadius + outerRadius * sinAlpha,
        y: outerRadius - outerRadius * cosAlpha
    };

    const Q = {
        x: outerRadius + outerRadius * sinBeta,
        y: outerRadius - outerRadius * cosBeta
    };

    const R = {
        x: outerRadius + innerRadius * sinBeta,
        y: outerRadius - innerRadius * cosBeta
    };

    const S = {
        x: outerRadius + innerRadius * sinAlpha,
        y: outerRadius - innerRadius * cosAlpha
    };

    return `M${P.x},${P.y} 
  A${outerRadius},${outerRadius} 0 ${largeArc ? '1,1' : '0,1'} ${Q.x},${Q.y} 
  L${R.x},${R.y} 
  A${innerRadius},${innerRadius} 0 ${largeArc ? '1,0' : '0,0'} ${S.x},${S.y}
   Z`;
}

const renderDiagram = (data) => {
    const theme = document.body.classList.contains('theme_light') ? 'light' : 'dark';

    const container = document.createElement('div');
    container.innerHTML = `
      <div class="diagram__donut-wrap">
        <svg viewBox="0 0 2 2" class="diagram__donut">
          <defs>
            <radialGradient id="dark-0" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="72%" stop-color="rgba(255, 163, 0, 0.8)" />
              <stop offset="100%" stop-color="rgba(91, 58, 0, 0.8)" />
            </radialGradient>
            <radialGradient id="dark-1" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="73%" stop-color="rgba(99, 63, 0, .5)" />
              <stop offset="100%" stop-color="rgba(15, 9, 0, .5) 100%)" />
            </radialGradient>
            <radialGradient id="dark-2" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="72%" stop-color="rgb(155, 155, 155, 0.5)" />
              <stop offset="100%" stop-color="rgb(56, 41, 0, 0.5)" />
            </radialGradient>
            <radialGradient id="dark-3" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="72%" stop-color="rgb(77, 77, 77, 0.5)" />
              <stop offset="100%" stop-color="rgb(56, 41, 0, 0.5)" />
            </radialGradient>

            <radialGradient id="light-0" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="81.25%" stop-color="rgba(255, 184, 0, 0.52)" />
              <stop offset="100%" stop-color="rgba(255, 239, 153, 0.32)" />
            </radialGradient>
            <radialGradient id="light-1" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="81.25%" stop-color="rgba(255, 184, 0, 0.24)" />
              <stop offset="100%" stop-color="rgba(255, 239, 153, 0.12)" />
            </radialGradient>
            <radialGradient id="light-2" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="82.81%" stop-color="rgba(166, 166, 166, 0.1725)" />
              <stop offset="100%" stop-color="rgba(203, 203, 203, 0.05)" />
            </radialGradient>
            <radialGradient id="light-3" fx="50%" fy=50% gradientUnits="userSpaceOnUse">
              <stop offset="82.81%" stop-color="rgba(191, 191, 191, 0.345" />
              <stop offset="100%" stop-color="rgba(228, 228, 228, 0.1)" />
            </radialGradient>
            
            <filter id="shadow-dark-0" primitiveUnits="objectBoundingBox" x="0%" y="0%">
             <feGaussianBlur stdDeviation="0.12" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(255, 162, 0)" flood-opacity="0.9" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
            <filter id="shadow-dark-1" primitiveUnits="objectBoundingBox" x="0%" y="0%">
              <feGaussianBlur stdDeviation="0.12" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(202, 129, 0)" flood-opacity="0.9" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
            <filter id="shadow-dark-2" primitiveUnits="objectBoundingBox" x="0%" y="0%">
              <feGaussianBlur stdDeviation="0.12" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(139, 139, 139)" flood-opacity="0.9" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
            <filter id="shadow-dark-3" primitiveUnits="objectBoundingBox" x="0%" y="0%">
              <feGaussianBlur stdDeviation="0.12" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(38, 38, 38)" flood-opacity="0.9" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
            
            <filter id="shadow-light-0" primitiveUnits="objectBoundingBox" x="0%" y="0%">
             <feGaussianBlur stdDeviation="0.12" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(255, 176, 57)" flood-opacity="0.9" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
            <filter id="shadow-light-1" primitiveUnits="objectBoundingBox" x="0%" y="0%">
              <feGaussianBlur stdDeviation="0.7" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(255, 176, 57)" flood-opacity="0.4" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
            <filter id="shadow-light-2" primitiveUnits="objectBoundingBox" x="0%" y="0%">
              <feGaussianBlur stdDeviation="2" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(105, 105, 105)" flood-opacity="0.3" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
            <filter id="shadow-light-3" primitiveUnits="objectBoundingBox" x="0%" y="0%">
              <feGaussianBlur stdDeviation="0.3" result="offset-blur" />
             <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
             <feFlood flood-color="rgb(131, 131, 131)" flood-opacity="0.6" result="color" />
             <feComposite operator="in" in="color" in2="inverse" result="shadow" />
             <feComposite operator="over" in="shadow" in2="SourceGraphic" /> 
            </filter>
          </defs>
        </svg>
        <div class="diagram__number">
          <p class="diagram__value"></p>
          <p class="diagram__change-value pale"></p>
        </div>
      </div>
      <ul class="diagram__legend diagram-legend"></ul>
  `;

    container.querySelector('.diagram__value').innerHTML = data.totalText.split(' ').join('<br>');
    container.querySelector('.diagram__change-value').innerHTML = data.differenceText;
    let values = [];

    data.categories.forEach((category, index) => {
        values.push(Number.parseInt(category.valueText.split(' ')[0]));

        const legendItem = document.createElement('li');
        legendItem.className = 'diagram-legend__line';
        legendItem.innerHTML = `
      <span class="diagram-legend__color diagram-legend__color_${index}"></span>
      <span class="diagram-legend__category">${category.title}</span>
      <span class="diagram-legend__change-value pale">${category.differenceText.split(' ')[0]}</span>
      <span class="diagram-legend__value pale">${category.valueText.split(' ')[0]}</span>
    `;

        container.querySelector('.diagram-legend').appendChild(legendItem);
    });

    const total = values.reduce((one, two) => one + two);
    const donut = container.querySelector('.diagram__donut');
    donut.style.transform = `rotate(-${(values[0] * 360 / total) / 2}deg)`;
    let offset = 0;
    values.forEach((value, index) => {
        const slice = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        // slice.classList.add('diagram__donut-segment');
        slice.setAttribute('r', '1');
        slice.setAttribute('fill', `url(#${theme}-${index})`);
        slice.setAttribute('filter', `url(#shadow-${theme}-${index})`);

        const start = offset;
        offset += (values[index] * Math.PI * 2 / total) - 0.0174533;
        const end = offset;

        const pathData = arc(start, end,1, 0.7);
        slice.setAttribute('d', pathData);

        donut.prepend(slice);
        offset += 0.0174533;
    });

    return container.innerHTML;
}

const setActivityBar = (parent, value, step) => {
    const theme = document.body.classList.contains('theme_light') ? 'light' : 'dark';

    const sources = ['min', 'mid', 'max', 'extra'];
    const image = document.createElement('img');
    const index = Math.ceil(value / step) < 3 ? Math.ceil(value / step) : 3;
    const name = `${sources[index]}-${theme}`;
    image.srcset = `assets/images/${name}@2x.png 1.5x, assets/images/${name}.png`;
    image.src = `assets/images/${name}.png`;
    image.alt = value;

    parent.appendChild(image);
}

const renderActivity = (data) => {
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="activity__grid"></div>
    <div class="activity__legend activity-legend">
      <div class="activity-legend__unit">
        <div class="activity-legend__color activity-legend__color_size"></div>
        <p class="activity-legend__text pale">1 час</p>
      </div>
    </div>
  `;

    const heatmap = container.querySelector('.activity__grid');
    const legend = container.querySelector('.activity__legend');
    const group = window.innerWidth > 480 && window.innerWidth < 1366;
    let activityData = data.data;
    let groupedData = [];

    if (group) {
        for (const day in activityData) {
            let grouped = [];
            for (let i = 1; i <= activityData[day].length; i += 2) {
                const unit = activityData[day][i] ? activityData[day][i] + activityData[day][i - 1] : activityData[day][i - 1];
                grouped.push(unit);
            }
            groupedData[day] = grouped;
        }
        container.querySelector('.activity-legend__text').innerHTML = '2 часа';
    }

    let maxValue = 0;
    const dataRef = group ? groupedData : activityData;
    for (const day in dataRef) {
        activityData[day].forEach(unit => {
            if (unit > maxValue) {
                maxValue = unit;
            }
        });
    }

    const step = Math.floor(maxValue / 3);

    for (let i = 0; i < 4; i++) {
        let text = '';
        switch (i) {
            case 0:
                text = '0';
                break;
            case 1:
                if (step === 1) {
                    text = '1';
                } else {
                    text = `1 — ${i + step - 1}`;
                }
                break;
            case 2:
                if (step === 1) {
                    text = '2';
                } else {
                    const low = Math.floor((i - 1) * maxValue / 3) + 1;
                    text = `${low} — ${low + step - 1}`;
                }
                break;
            case 3:
                let low = Math.floor((i - 1) * maxValue / 3) + 1;
                if (maxValue % 3 === 2) {
                    low = Math.floor((i - 1) * maxValue / 3);
                }
                text = `${low} — ${maxValue}`;
        }

        const legendItem = document.createElement('div');
        legendItem.className = 'activity-legend__unit';
        legendItem.innerHTML = `
      <div class="activity-legend__color activity-legend__color_${i}"></div>
      <p class="activity-legend__text pale">${text}</p>
    `;
        legend.appendChild(legendItem);
    }

    if (window.innerWidth < window.innerHeight) {
        const array = [];

        for (const day in activityData) {
            array.push(...activityData[day]);
        }

        for (let i = 0; i < activityData['mon'].length; i++) {
            const row = document.createElement('div');
            row.classList.add('activity__grid-row');
            row.id = `row-${i}`;
            heatmap.appendChild(row);
        }

        for (let j = 0; j < array.length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('activity__grid-cell');
            setActivityBar(cell, array[j], step);

            const row = container.querySelector(`#row-${Math.floor(j % activityData['mon'].length)}`);
            row.appendChild(cell);
        }
    } else if (group) {
        const array = [];

        for (const day in groupedData) {
            array.push(groupedData[day]);
        }

        for (let i = 0; i < 7; i++) {
            const row = document.createElement('div');
            row.classList.add('activity__grid-row');
            heatmap.appendChild(row);

            for (let j = 0; j < array[0].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('activity__grid-cell');
                setActivityBar(cell, array[i][j], step);
                row.appendChild(cell);
            }
        }
    } else {
        const array = [];

        for (const day in activityData) {
            array.push(...activityData[day]);
        }

        for (let i = 0; i < 7; i++) {
            const row = document.createElement('div');
            row.classList.add('activity__grid-row');
            row.id = `row-${i}`;
            heatmap.appendChild(row);
        }

        for (let j = 0; j < array.length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('activity__grid-cell');
            setActivityBar(cell, array[j], step);

            const row = container.querySelector(`#row-${Math.floor(j / activityData['mon'].length)}`);
            row.appendChild(cell);
        }
    }

    return container.innerHTML;
}

window.renderTemplate = (alias, data) => {
    let renderFunction;

    switch (alias) {
        case 'leaders':
            renderFunction = renderLeaders;
            break;
        case 'vote':
            renderFunction = renderVote;
            break;
        case 'chart':
            renderFunction = renderChart;
            break;
        case 'diagram':
            renderFunction = renderDiagram;
            break;
        case 'activity':
            renderFunction = renderActivity;
            break;
    }

    return `
    <div id="anchor" class="anchor">
      <h1 class="title title_main" id="main-title">${data.title}</h1>
      <p class="subtitle_main pale" id="subtitle">${data.subtitle}</p>
      <div class="container ${alias} ${alias}_${mod(alias, data)}">${renderFunction(data)}</div>
    </div>
  `;
}
