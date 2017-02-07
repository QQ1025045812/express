const fs=require('fs');
const repos=require('./data');
module.exports={
    store(){
        fs.writeFileSync(__dirname+'/data.json',JSON.stringify(repos));
    },
    get(index){
        return repos[index];
    },
    get list(){
        return repos;
    },
    add(article){
         repos.push(article);
         this.store();
    },
    del(index){
        repos.splice(index,1);
         this.store();
    },
    update(index,newArticle){
        repos.splice(index,1,newArtcle);
        this.store();
    }
}