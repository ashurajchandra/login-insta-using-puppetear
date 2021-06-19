const puppeteer = require('puppeteer');
const BASE_URL = 'https://instagram.com/';
const TAG_URL = (tag)=> `https://instagram.com/explore/tags/${tag}/`

const instagram = {
    browser:null,
    page:null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            headless:false
        });
        
        instagram.page = await instagram.browser.newPage();
        
    },
    login: async (username,password)=>{
        await instagram.page.goto(BASE_URL, {waitUntil: 'networkidle2'})
        // let loginButton = await instagram.page.$x('//button[contains(text(), "Log in")]');
        // /* click on the login url button */
        // console.log("login btn",loginButton)
        // await loginButton[0].click();
        // await instagram.page.waitFor(1000);

        /* writing the username and password */
        await instagram.page.waitFor(1000);
        await instagram.page.type('input[name="username"]',username, {delay:50});
        await instagram.page.type('input[name="password"]',password, {delay:50});

        /* clicking on the login button */
       let loginButton = await instagram.page.$x("//button[@type='submit']");
    //    console.log("login btn",loginButton)
        await loginButton[0].click();

        await instagram.page.waitFor(10000);
        await instagram.page.waitFor('//*[@id="react-root"]/div/div/section/nav/div[2]/div/div/div[3]/div/div[5]/span/img');
        console.log("found profile");
    },
     likeTagsProcess:async(tags=[]) => {
         console.log("into liketagsprocess")
        for(let tag of tags){
            /* Go to the tag page*/ 
            await instagram.page.goto(TAG_URL(tag), {waitUntil:'networkidle2'});
            await instagram.page.waitFor(1000);

            let posts = await instagram.page.$x('//*[@id="react-root"]/div/div/section/main/article/div[2]/div/div[1]');
            console.log("posts",posts)
            for(let i = 0; i<3; i++){
                let post = posts[i];
                console.log("post",post);

                /* click on the post */
                await post.click();
            }
            
        }
    }
}
module.exports = instagram;