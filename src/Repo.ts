// Class for the Git Hub Repo data for a certain user

export class Repo {
    name : string;
    description : string;
    url : string;
    size : number;
    forksCount : number;

    constructor (repo : any) {
        this.name = repo.name;
        this.description = repo.description;
        this.url = repo.html_url;
        this.size = repo.html_size;
        this.forksCount = repo.forks;
    }
}