const insta = require('./Instagram');

(async ()=>{
    await insta.initialize();
    debugger;

    await insta.login("ashurajchandr_rai","841503Bihar");

    await insta.likeTagsProcess(['cars','wwe'])
})()