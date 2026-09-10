const DRIVE_PREFIX = 'https://drive.google.com/file/d/'
const DRIVE_SUFFIX = '/preview'

const driveUrl = (id: string) => `${DRIVE_PREFIX}${id}${DRIVE_SUFFIX}`

const rawMap: Record<string, string> = {
  // === BARBELL / COMPOUND ===
  'power clean': driveUrl('1MfywHKOBml-wC4ZFn8wacm1uWIB0gTd7'),
  'hang power clean': driveUrl('1kqQtJ6C3OB8BIY6jsH-dWl6BDcfM4H_I'),
  'bb hang clean': driveUrl('1kqQtJ6C3OB8BIY6jsH-dWl6BDcfM4H_I'),
  'barbell deadlift': driveUrl('1m9iVRcSskkTH48bLuW4wfM1-Yb8mAZYI'),
  'bb deadlift': driveUrl('1m9iVRcSskkTH48bLuW4wfM1-Yb8mAZYI'),
  'trap bar deadlift': driveUrl('1D0EXZaP51XZgVEliraJfp6oU3-1Nj0bi'),
  'romanian deadlift': driveUrl('1qDf1RdGkQCZ6xwS9lPgGtVlodlY4lpMf'),
  'bb rdl': driveUrl('1qDf1RdGkQCZ6xwS9lPgGtVlodlY4lpMf'),
  'barbell shoulder press': driveUrl('11Ha_rE8dmNKHJLOfDSo4Sf9_2Ale2sQC'),
  'overhead press': driveUrl('11Ha_rE8dmNKHJLOfDSo4Sf9_2Ale2sQC'),
  'bb military press': driveUrl('11Ha_rE8dmNKHJLOfDSo4Sf9_2Ale2sQC'),
  'seated shoulder press': driveUrl('11Ha_rE8dmNKHJLOfDSo4Sf9_2Ale2sQC'),
  'machine shoulder press': driveUrl('11Ha_rE8dmNKHJLOfDSo4Sf9_2Ale2sQC'),
  'bb shrug': driveUrl('1jPDRU9xT5fnOfZ_2IT2aPBuB9GuDnOhD'),
  'smith machine shrug': driveUrl('1jPDRU9xT5fnOfZ_2IT2aPBuB9GuDnOhD'),
  'trap bar shrug': driveUrl('1jPDRU9xT5fnOfZ_2IT2aPBuB9GuDnOhD'),
  'bb up right rows': driveUrl('1Y3bMeEKP3MwGpBhPIH8dyKthoM_99sJR'),
  'bb split jerk': driveUrl('1_85h31u-I3_bqOIiErt4SaaOAkIisoC7'),
  'landmine split jerk': driveUrl('1_85h31u-I3_bqOIiErt4SaaOAkIisoC7'),
  'barbell curl': driveUrl('1gq2ZBL9RbYtJ6s5uhq4V61pq5D6OJu8l'),
  'bb curls': driveUrl('1gq2ZBL9RbYtJ6s5uhq4V61pq5D6OJu8l'),
  'barbell finger curl': driveUrl('1yWyUHv_jMEGa5UNEkOZalPEIWELgKZGV'),
  'bb finger curls': driveUrl('1yWyUHv_jMEGa5UNEkOZalPEIWELgKZGV'),
  'bb hang cling': driveUrl('1CEfV5NyHjI7aaskGN7xByBxpHQvWNrqZ'),

  // === DUMBBELL ===
  'dumbbell hang snatch': driveUrl('1gvrNJdoTL4n14wAl5SQCUJfpN-6UfaVI'),
  'barbell hang snatch': driveUrl('1gvrNJdoTL4n14wAl5SQCUJfpN-6UfaVI'),
  'dumbbell farmer carry': driveUrl('1s5oMZpZNYHfVH4_DUezhFi1QQIzq_45V'),
  'db farmer carry': driveUrl('1s5oMZpZNYHfVH4_DUezhFi1QQIzq_45V'),
  'farmer carry': driveUrl('1s5oMZpZNYHfVH4_DUezhFi1QQIzq_45V'),
  'farmer carry — fat grips': driveUrl('1s5oMZpZNYHfVH4_DUezhFi1QQIzq_45V'),
  'half kneeling dumbbell shoulder press': driveUrl('16JUfnQiDBVR0tdc1nc448kghq4MoYD15'),
  'half kneeling shoulder press': driveUrl('16JUfnQiDBVR0tdc1nc448kghq4MoYD15'),

  // === CABLE ===
  'cable face pull': driveUrl('1tfrRoDMuwPfZlAl5SMUoCZLVOSdU9gXZ'),
  'face pull': driveUrl('1tfrRoDMuwPfZlAl5SMUoCZLVOSdU9gXZ'),
  'cable overhead tricep extension': driveUrl('1rHOYHu5U2GYFcj1dirR4lZOOoNsBRa2T'),
  'overhead tricep extension': driveUrl('1rHOYHu5U2GYFcj1dirR4lZOOoNsBRa2T'),
  'cable tricep extension': driveUrl('1movF2Fs29ia3-LACjqVIq0CcJ8KYCh_U'),
  'cable tricep extensions': driveUrl('1movF2Fs29ia3-LACjqVIq0CcJ8KYCh_U'),
  'cable tricep pushdown': driveUrl('1movF2Fs29ia3-LACjqVIq0CcJ8KYCh_U'),
  'cable tricep extension — rope': driveUrl('1movF2Fs29ia3-LACjqVIq0CcJ8KYCh_U'),
  'cable v-bar tricep extension': driveUrl('1movF2Fs29ia3-LACjqVIq0CcJ8KYCh_U'),
  'cable single arm tricep extension': driveUrl('1SyUU_rezcwA-j31cPmvB2he_4-pL7TqL'),
  'single arm cable tricep extension': driveUrl('1SyUU_rezcwA-j31cPmvB2he_4-pL7TqL'),
  'cable rope curl': driveUrl('1L-QOlgY2eLVB-XXlInb-qLL8Rrna93Xe'),
  'cable single arm curls': driveUrl('1EmZ8kJFIk21exTgKW30TtZ5TffyZXoE_'),
  'single arm cable curl': driveUrl('1EmZ8kJFIk21exTgKW30TtZ5TffyZXoE_'),
  'anchored single arm cable curls': driveUrl('1u6pRlZCcU7R2TVmwPmaEg639wJP_N4UO'),
  'cable straight bar curls': driveUrl('15fWszvG3IftKLLlXkK7LgKx_1N3ai0Vj'),
  'cable lateral raise': driveUrl('1raumgTbTXhkHTajdgCDspAV5Yrd_gIdM'),
  'dumbbell lateral raise': driveUrl('1raumgTbTXhkHTajdgCDspAV5Yrd_gIdM'),
  'machine lateral raise': driveUrl('1raumgTbTXhkHTajdgCDspAV5Yrd_gIdM'),
  'cable lat pull through': driveUrl('1pSZX0UeGyaLc3Yz9vzmwBi58gjhsmqpT'),
  'cable front raise — rope': driveUrl('1-22gXaXQeyK1BMt9f8bwdwSxkArbkeZ6'),
  'cable rope front raise': driveUrl('1-22gXaXQeyK1BMt9f8bwdwSxkArbkeZ6'),
  'cable chest fly': driveUrl('17fjuOcJgYxQo_9fXVgQR1BdZAyp2wlyM'),
  'cable fly': driveUrl('17fjuOcJgYxQo_9fXVgQR1BdZAyp2wlyM'),
  'standing incline cable chest fly': driveUrl('1Whv3yGCUAq8QyIwCML_nYoOxUjHq3ieP'),
  'chest fly high': driveUrl('1Whv3yGCUAq8QyIwCML_nYoOxUjHq3ieP'),
  'chest fly low': driveUrl('1jBoPHZqj8z9zfV8b3zp9XFOh0wVwsvT2'),
  'chest fly mid': driveUrl('17fjuOcJgYxQo_9fXVgQR1BdZAyp2wlyM'),
  'dual cable curl': driveUrl('1efLOhkL3n86RaG47YufHyVkW7GybulpE'),
  'dual cable behind the body curls': driveUrl('1efLOhkL3n86RaG47YufHyVkW7GybulpE'),
  'high cable single arm row': driveUrl('1sjQy_7g_p8qDzpPElARMI8VB5_SMo5J-'),

  // === EZ BAR ===
  'ez bar skull crusher': driveUrl('1iiQqQza0GoPxEs97gS2Eu1ox3PCZ_fec'),
  'ez bar skull crushers': driveUrl('1iiQqQza0GoPxEs97gS2Eu1ox3PCZ_fec'),
  'cable skull crusher': driveUrl('1iiQqQza0GoPxEs97gS2Eu1ox3PCZ_fec'),
  'dumbbell skull crusher': driveUrl('1iiQqQza0GoPxEs97gS2Eu1ox3PCZ_fec'),
  'ez bar close grip curls': driveUrl('1IldbNcCHfXiBRsGngrhxxFb3xqeF8uEe'),
  'ez bar reverse grip curl': driveUrl('1IldbNcCHfXiBRsGngrhxxFb3xqeF8uEe'),
  'ez bar spider curl': driveUrl('1IldbNcCHfXiBRsGngrhxxFb3xqeF8uEe'),
  'ez bar curl': driveUrl('1IldbNcCHfXiBRsGngrhxxFb3xqeF8uEe'),
  'ez bar curl — arm blaster': driveUrl('1IldbNcCHfXiBRsGngrhxxFb3xqeF8uEe'),
  'ez bar reverse curl': driveUrl('1IldbNcCHfXiBRsGngrhxxFb3xqeF8uEe'),

  // === LANDMINE ===
  'landmine cossack squat': driveUrl('1wy7zQOHDajUSKYwWWnCeywepKgi_MH9T'),
  'landmine hack squat': driveUrl('1yfdzD-mcVomTyfHK522ohe4_01i5ByfN'),
  'landmine chest press': driveUrl('10VFyUdtUKUZG72eW4Hx2jXnfsFd2yQSQ'),
  'landmine curtsy squat': driveUrl('18_pJjk001GUfUQ8ZVyRyo4ezShbEL6m7'),

  // === CHEST ===
  'explosive push-ups': driveUrl('10FcByvmo6kxjIyHA_asZN7US54Sy1JEK'),
  'banded explosive push ups': driveUrl('1nYaDoMglrzSOcsuVTVeqi-_tknRYA7ZV'),

  // === LEGS ===
  'nordic curl': driveUrl('1wnX7ZI-gjlkEAMTxT0OUGWqB-CCr5cUf'),
  'nordic curls': driveUrl('1wnX7ZI-gjlkEAMTxT0OUGWqB-CCr5cUf'),
  'heavy sled push': driveUrl('1iNYS_rcLEIjUoIOaFg30Ii7ymfkD5zpo'),
  'heavy sled pushes': driveUrl('1iNYS_rcLEIjUoIOaFg30Ii7ymfkD5zpo'),
  'sled push': driveUrl('1iNYS_rcLEIjUoIOaFg30Ii7ymfkD5zpo'),
  'sled sprint': driveUrl('1iNYS_rcLEIjUoIOaFg30Ii7ymfkD5zpo'),
  'sled pushes': driveUrl('1iNYS_rcLEIjUoIOaFg30Ii7ymfkD5zpo'),
  'heavy sled push & pull shuttle': driveUrl('1NA7KL8hls4tw5EhvtHAmdysS179WR1xj'),
  'sled push/pull': driveUrl('1NA7KL8hls4tw5EhvtHAmdysS179WR1xj'),
  'lateral sled pull': driveUrl('1NA7KL8hls4tw5EhvtHAmdysS179WR1xj'),
  'staggard stance trap bar deadlift': driveUrl('1kLo4p1UPGlsC9bDhxXedKEsbyvwtskD3'),
  'staggered stance trap bar deadlift': driveUrl('1kLo4p1UPGlsC9bDhxXedKEsbyvwtskD3'),
  'death drop to vertical jump': driveUrl('1wDRnmDQReiLk7eFOdr1E4wLm5tBMN1Da'),
  'seated box jump': driveUrl('1M0-_AjBbFDkXCp9sckBJqcR8p2ibvbI8'),
  'seated straight box jump': driveUrl('1M0-_AjBbFDkXCp9sckBJqcR8p2ibvbI8'),
  'single leg box jump': driveUrl('19nM7Skfdeel8-XlqwhWL645pjNd4ENX-'),
  'broad jump': driveUrl('1Wt_vBhKqCCsM2r5k-CXFvuDGjrhEp2nL'),
  'trap bar jump': driveUrl('1M30Q6jNQliOAQWAuFRhOIyy5zANVbZeJ'),
  'pogo jump': driveUrl('11nMalEqIk-2s7bzq3XUI9RZoRi5ER4NX'),
  'pogos': driveUrl('11nMalEqIk-2s7bzq3XUI9RZoRi5ER4NX'),
  'single leg pogos': driveUrl('1dtmMEcPjU8La954WIGcGKXTE4nGKAjOg'),
  'ice skaters': driveUrl('1sEMS4FqDGWhX8IeNJE64mKHc5E0R48fc'),

  // === ABS / CORE ===
  'plank': driveUrl('1H_c2R0agpgG5wV6XnUSNruXIzb_OWvEC'),
  'plank hold': driveUrl('1H_c2R0agpgG5wV6XnUSNruXIzb_OWvEC'),
  'side plank': driveUrl('1vp5DTRnr4HOSkGzXLSFBXXuUXKR2pyh-'),
  'hollow hold': driveUrl('1Zw2FmFSJaNWC5olBnubMw4XeYJ33pKfD'),
  'russian twist': driveUrl('1jNczkrWXKw7jDSAnJq0xoFBg81iHLnuQ'),
  'russian twist weighted': driveUrl('1jNczkrWXKw7jDSAnJq0xoFBg81iHLnuQ'),
  'flutter kicks': driveUrl('1zwsfcPk49X9aFzGAsjCaUdCEhUFh8MRb'),
  'scissors': driveUrl('1C32fEJEi_HwT8lA1h917jCTiqPjhNrDY'),
  'toe touch': driveUrl('1ax5k1prMqth3qkXf8Ar0-JcEtpbHrdy4'),
  'toe touches': driveUrl('1ax5k1prMqth3qkXf8Ar0-JcEtpbHrdy4'),
  'weighted v-up': driveUrl('1awrVEim0fQaarDQNduhiZ05fHgYtk2sw'),
  'weighted v-ups': driveUrl('1awrVEim0fQaarDQNduhiZ05fHgYtk2sw'),
  'ghd sit-up': driveUrl('1-aWbweP4LWMrzDvFpDzl0ROVWPaMlAY3'),
  'ghd sit-ups': driveUrl('1-aWbweP4LWMrzDvFpDzl0ROVWPaMlAY3'),
  'ghd sit ups': driveUrl('1-aWbweP4LWMrzDvFpDzl0ROVWPaMlAY3'),
  'knee tucks': driveUrl('1WTvczZHLCdcj9W6z2JmdpRowwHdLwdDg'),
  'oblique crunch': driveUrl('1P5NbxRzDwR7Z1A26tMMCzOjbR88SsVAj'),
  'oblique crunches': driveUrl('1P5NbxRzDwR7Z1A26tMMCzOjbR88SsVAj'),
  'dumbbell oblique crunch': driveUrl('1P5NbxRzDwR7Z1A26tMMCzOjbR88SsVAj'),
  'cross body oblique crunches': driveUrl('184IhRAW4i8lHsNugdpx2u0SkXwmF4a4l'),
  'decline crunch': driveUrl('184IhRAW4i8lHsNugdpx2u0SkXwmF4a4l'),
  'ab mat situps': driveUrl('1Bx6h5FTsywTKeIdyZNWVkTZ6Vj-w9stB'),
  'med ball slam': driveUrl('1ca8TLfRpETfQ1xkFCU0bKQB1qLYS4Wwr'),
  'med ball slams': driveUrl('1ca8TLfRpETfQ1xkFCU0bKQB1qLYS4Wwr'),
  'half kneeling med ball throw': driveUrl('1l7kduU8eugnXAieS790CBXoI6MkSPhyv'),
  'rotational med ball throw': driveUrl('1l7kduU8eugnXAieS790CBXoI6MkSPhyv'),
  'med ball rotational throw': driveUrl('1l7kduU8eugnXAieS790CBXoI6MkSPhyv'),
  'med ball forward throw': driveUrl('1Z6CHhm81TGMdat95jJdS3AL7RzmVhhcQ'),
  'med ball throw behind head': driveUrl('1D-_EoBLFtRQpz8ZL9obmK6bm2OGSTNVe'),
  'staggered stance rotational med ball slams': driveUrl('1uc4x39tug8PSj42AaRi2k3KuB_eQmn6p'),
  'superman': driveUrl('1tuY6KtfwcdFbNzDgTaSbcoKqhWqkr0Bl'),
  'supermans': driveUrl('1tuY6KtfwcdFbNzDgTaSbcoKqhWqkr0Bl'),
  'hyper extension': driveUrl('1dgcmFICXKTu6EMSnpJtRopYi4cOC7kNa'),
  'hyperextensions': driveUrl('1dgcmFICXKTu6EMSnpJtRopYi4cOC7kNa'),
  'reverse hyper extension': driveUrl('1dgcmFICXKTu6EMSnpJtRopYi4cOC7kNa'),

  // === BANDED / WARMUP ===
  'banded pull-apart': driveUrl('12j2T47BtImKsGtafV_V0yc8Dv_cTKlLe'),
  'banded pull aparts': driveUrl('12j2T47BtImKsGtafV_V0yc8Dv_cTKlLe'),
  'banded 90 & shoot': driveUrl('19VruhwKe1ytO5fsmMeDH0YL4xhkXohJ3'),
  'banded around the worlds': driveUrl('1v5LC-aTTZuPufdysAxwtjsxjEGxVqxZU'),
  'banded external rotations': driveUrl('1fteyc4E7C39RioHlnEBlpVhY7uA55tGH'),
  'banded internal rotations': driveUrl('19jC3gVhdw0ttzkdrEfCaSIWLNyO9hbID'),
  'banded pass through': driveUrl('1Yc7aqklecKGbu2J39lDxOyMPoghi8rvP'),
  "banded t's": driveUrl('1u-pc4U76BAH7EGYsDtz99YAHgBxundVO'),
  "banded w's": driveUrl('1qfR6gVCg7zKNoxvWfAcxAJYMTPMS1CaS'),
  "banded y's": driveUrl('1hKLAt9u99sGGXT3P6MonNNypKQRPBIAP'),

  // === CONDITIONING ===
  'rowing machine': driveUrl('18hqRD20dKLm6OZKzU2vfaMzN5zlC7I0B'),
  'rowing machine intervals': driveUrl('18hqRD20dKLm6OZKzU2vfaMzN5zlC7I0B'),
  'assault bike intervals': driveUrl('1A4T3Yq41uuz_yFKO1jCiWpIt2iHxoHVJ'),
  'assault bike sprint': driveUrl('1A4T3Yq41uuz_yFKO1jCiWpIt2iHxoHVJ'),
  'bike intervals': driveUrl('1A4T3Yq41uuz_yFKO1jCiWpIt2iHxoHVJ'),
  'eco bike': driveUrl('1A4T3Yq41uuz_yFKO1jCiWpIt2iHxoHVJ'),
  'skiier': driveUrl('1Z_QGNC3pCvGc1kqBxh2JzSw5r06h2NKx'),
  'ski erg': driveUrl('1Z_QGNC3pCvGc1kqBxh2JzSw5r06h2NKx'),

  // === DYNAMIC WARMUP / SPEED ===
  'a-skips': driveUrl('1Sz0gGJtKyhg0yDqSUbpUKPPNE1iRtK51'),
  'a skips': driveUrl('1Sz0gGJtKyhg0yDqSUbpUKPPNE1iRtK51'),
  'b-skips': driveUrl('1xsDcr9SeKeIZZlim71LATyW1egC8YdsP'),
  'b skips': driveUrl('1xsDcr9SeKeIZZlim71LATyW1egC8YdsP'),
  'c-skips': driveUrl('1GGTDmFT_B75WiHwXSRd5YZbhSEJbIyQN'),
  'c skips': driveUrl('1GGTDmFT_B75WiHwXSRd5YZbhSEJbIyQN'),
  'd-skips': driveUrl('1_ArYFBPonTZviA1JCidBRdKPG-g6RzHC'),
  'd skips': driveUrl('1_ArYFBPonTZviA1JCidBRdKPG-g6RzHC'),
  'high knees': driveUrl('1GyOUdLTcgYO3WB2s6Qsuyoy3qY5CeZSq'),
  'butt kicks': driveUrl('1WVAZjaZFcTENB4QtfWlgp7nOquOgZKGl'),
  'karaoke': driveUrl('1FgtQEuZssIFtgriNQtwj3jbOjDgfTd61'),
  'shuffles': driveUrl('166lAZ67JB_mx-396FlDmefQXtJk0MF4M'),
  'bounds for distance': driveUrl('1lOUIORyq1ldO_9FiIyZOtov-AFR7FnE8'),
  'straight leg marches': driveUrl('1sy5AGVltcyXanVZ0PVAUGfTWDS-JdzHS'),
  'quad pulls': driveUrl('1GJ7ow2OnFvTd7pUKmCMvpjwta5lmVRj8'),
  'scoops': driveUrl('1AnOOMOH4KFh4a5QpfVWZgqCwN0je8fvu'),
  'lateral pogos': driveUrl('18jy-EXVbB4E1AmCR2w2q4jPBbz1bIyiw'),
  'fast leg': driveUrl('1EvvlieZdZNfv9raLaeGcr0GwebssWOWl'),
  'short strikes': driveUrl('1vaV4GglntrTT3f9XReNJtO1UD7wss53v'),
  'forward kneeling starts': driveUrl('11lts77ZNB6RUQvweAXgmk_rgBmevuUsh'),

  // === CHANGE OF DIRECTION ===
  '5-10-5': driveUrl('1BotPMCA1K_jrtQls1Q8kmUHfNFG2FLkV'),
  'shuffles into a stick': driveUrl('1MveqT6nGE8vlJYkuuZdbjrNgOdZMogtU'),
}

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(\d+[a-c]?\.\s*)/, '')
    .replace(/\s*—\s*/g, ' ')
    .replace(/\s*-\s*/g, ' ')
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

const videoMap = new Map<string, string>()
for (const [key, url] of Object.entries(rawMap)) {
  videoMap.set(normalize(key), url)
}

export function getVideoUrl(exerciseName: string): string | undefined {
  const n = normalize(exerciseName)

  const exact = videoMap.get(n)
  if (exact) return exact

  for (const [key, url] of videoMap) {
    if (key.length >= 8 && n.includes(key)) return url
  }

  return undefined
}
