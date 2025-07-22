const events = {
  child: [
    {
      description: 'You made a new friend at the playground.',
      effect: { happiness: 10 },
    },
    {
      description: 'You fell and scraped your knee.',
      effect: { happiness: -5, health: -5 },
    },
    {
      description: 'You learned to ride a bike.',
      effect: { happiness: 10 },
      oneTime: true,
    },
    {
      description: 'You found a cool bug.',
      effect: { happiness: 5, smarts: 5 },
    },
    {
      description: 'You got a new toy!',
      effect: { happiness: 15 },
    },
    {
      description: 'You had a nightmare.',
      effect: { happiness: -10 },
    },
    {
      description: 'You learned to read.',
      effect: { smarts: 10 },
      oneTime: true,
    },
    {
      description: 'You ate something weird and got a tummy ache.',
      effect: { health: -5, happiness: -5 },
    },
    {
      description: 'You got lost in a store.',
      effect: { happiness: -15 },
    },
    {
      description: 'Your parents read you a bedtime story.',
      effect: { happiness: 10 },
    },
    {
      description: 'You finger-painted a masterpiece.',
      effect: { happiness: 10 },
    },
    {
      description: 'You had your first crush on a classmate.',
      effect: { happiness: 5 },
    },
    {
      description: 'You built a magnificent sandcastle, but the tide washed it away.',
      effect: { happiness: -5 },
    },
  ],
  teen: [
    {
      description: 'You got your first kiss.',
      effect: { happiness: 15 },
      oneTime: true,
    },
    {
      description: 'You failed a test.',
      effect: { happiness: -10, smarts: -5 },
    },
    {
      description: 'You got into a fight at school.',
      effect: { happiness: -10, health: -10 },
    },
    {
      description: 'You went to your first concert.',
      effect: { happiness: 20 },
    },
    {
      description: 'You got a part-time job.',
      effect: { money: 500, happiness: 5 },
    },
    {
      description: 'You had a big argument with your parents.',
      effect: { happiness: -15 },
    },
    {
      description: 'You learned to drive.',
      effect: { happiness: 10 },
      oneTime: true,
    },
    {
      description: 'You joined a school club.',
      effect: { happiness: 5, smarts: 5 },
    },
    {
      description: 'You got braces.',
      effect: { happiness: -10, looks: 15 },
    },
    {
      description: 'Your crush asked you out.',
      effect: { happiness: 25 },
      oneTime: true,
    },
    {
      description: 'You got caught sneaking out.',
      effect: { happiness: -20 },
    },
    {
      description: 'You dyed your hair a crazy color.',
      effect: { looks: 10, happiness: 5 },
    },
    {
      description: 'You aced your final exams.',
      effect: { smarts: 15, happiness: 10 },
    },
  ],
  adult: [
    {
      description: 'You found a wallet on the street.',
      effect: { happiness: 5, money: 50 },
    },
    {
      description: 'You got sick with the flu.',
      effect: { health: -10, happiness: -5 },
    },
    {
      description: 'You won a small lottery prize.',
      effect: { happiness: 10, money: 1000 },
    },
    {
      description: 'Your car broke down.',
      effect: { happiness: -5, money: -200 },
    },
    {
      description: 'You received a promotion at work.',
      effect: { happiness: 10, money: 5000 },
    },
    {
      description: 'You got into a fight.',
      effect: { happiness: -10, health: -5 },
    },
    {
      description: 'You got married.',
      effect: { happiness: 50 },
      oneTime: true,
    },
    {
      description: 'You had a child.',
      effect: { happiness: 40, money: -1000 },
      oneTime: true,
    },
    {
      description: 'You bought a house.',
      effect: { happiness: 20, money: -50000 },
      oneTime: true,
    },
    {
      description: 'You traveled to a new country.',
      effect: { happiness: 15 },
    },
    {
      description: 'You started your own business.',
      effect: { money: -10000, happiness: 10 },
      oneTime: true,
    },
    {
      description: 'You got a pet.',
      effect: { happiness: 15 },
    },
    {
      description: 'You went through a mid-life crisis.',
      effect: { happiness: -50, looks: -10 },
      oneTime: true,
    },
    {
      description: 'Your favorite sports team won a championship.',
      effect: { happiness: 15 },
    },
    {
      description: 'You were the victim of a petty crime.',
      effect: { happiness: -10, money: -100 },
    },
    {
      description: 'You cooked a gourmet meal for the first time.',
      effect: { happiness: 10 },
    },
  ],
  interactive: [
    {
      ageRange: [3, 4],
      description: 'Your mom yelled at you.',
      options: [
        { text: 'Bite her', effect: { happiness: -10, health: -5 } },
        { text: 'Say sorry', effect: { happiness: 5 } },
        { text: 'Do nothing', effect: {} },
      ],
    },
    {
      ageRange: [6, 10],
      description: 'A stray cat appears at your door.',
      options: [
        { text: 'Feed it', effect: { happiness: 10 } },
        { text: 'Ignore it', effect: {} },
        { text: 'Shoo it away', effect: { happiness: -5 } },
      ],
    },
    {
      ageRange: [13, 17],
      description: 'Your friend wants to copy your homework.',
      options: [
        { text: 'Let them', effect: { happiness: 5, smarts: -5 } },
        { text: 'Refuse', effect: { happiness: -5 } },
        { text: 'Tell the teacher', effect: { smarts: 5, happiness: -10 } },
      ],
    },
    {
      ageRange: [18, 65],
      description: 'You find a wallet on the ground.',
      options: [
        { text: 'Take the money and leave it', effect: { money: 100, happiness: -10 } },
        { text: 'Look for ID to return it', effect: { happiness: 15 } },
        { text: 'Leave it', effect: {} },
      ],
    },
    {
      ageRange: [10, 16],
      description: 'A bully is picking on a younger kid.',
      options: [
        { text: 'Intervene', effect: { happiness: 10, health: -10 } },
        { text: 'Get a teacher', effect: { happiness: 5 } },
        { text: 'Walk away', effect: { happiness: -10 } },
      ],
    },
    {
      ageRange: [20, 60],
      description: 'Your boss asks you to work late on a Friday.',
      options: [
        { text: 'Agree', effect: { money: 100, happiness: -10 } },
        { text: 'Make an excuse', effect: { happiness: 5 } },
        { text: 'Refuse', effect: { happiness: -5 } },
      ],
    },
  ],
  special: [
    { description: 'You started preschool.', effect: { smarts: 5 }, age: 3, oneTime: true, isSpecial: true },
    { description: 'You started high school.', effect: { smarts: 10 }, age: 14, oneTime: true, isSpecial: true },
    //{ description: 'You started university.', effect: { smarts: 20 }, age: 18, oneTime: true, isSpecial: true },
    { description: 'You graduated from high school.', effect: { smarts: 10, happiness: 15 }, age: 18, oneTime: true, isSpecial: true },
    //{ description: 'You graduated from university.', effect: { smarts: 20, happiness: 25 }, age: 22, oneTime: true, isSpecial: true },
   //{ description: 'You got your first job.', effect: { money: 2000, happiness: 10 }, age: 22, oneTime: true, isSpecial: true },
    { description: 'You retired.', effect: { happiness: 20 }, age: 65, oneTime: true, isSpecial: true },
  ]
};

export const getEvent = (age, triggeredOneTimeEvents) => {
  const specialEvent = events.special.find(event => event.age === age && !triggeredOneTimeEvents.includes(event.description));
  if (specialEvent) {
    return specialEvent;
  }

  const interactiveEvent = events.interactive.find(event => age >= event.ageRange[0] && age <= event.ageRange[1] && !triggeredOneTimeEvents.includes(event.description));
  if (interactiveEvent) {
    return { ...interactiveEvent, isInteractive: true };
  }

  let ageGroup;
  if (age < 13) {
    ageGroup = 'child';
  } else if (age < 18) {
    ageGroup = 'teen';
  } else {
    ageGroup = 'adult';
  }

  const ageGroupEvents = events[ageGroup].filter(event => !event.oneTime || !triggeredOneTimeEvents.includes(event.description));
  if (ageGroupEvents.length === 0) {
    return null;
  }
  return ageGroupEvents[Math.floor(Math.random() * ageGroupEvents.length)];
};