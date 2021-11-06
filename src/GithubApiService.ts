// Class to run the API data retrieval from GitHub

import * as request from 'request'  // For the GET functionality

import { Repo } from './Repo';
import { User } from './User';

// Constant data - eg Headers
const OPTIONS : any = {
    headers : {
        'User-Agent': 'request'
    },
    json : true
}

export class GithubApiService {
    // Get the user data
    getUserInfo (userName : string, cb : (user : User) => any) {       // Is asynchroonus       // Callback type, function, takes in User and outputs any
        request.get('https://api.github.com/users/' + userName, OPTIONS, (error : any, response:any, body : any) => {
            // Set the body data returned as the User
            let user = new User (body);
            // Call back
            cb(user);           
        });
    }
    // Get the Repos data
    getRepos (userName : string, cb : (repoArray : Repo[]) => any) {
        request.get('https://api.github.com/users/' + userName + '/repos', OPTIONS, (error : any, response:any, body : any) => {
            // Map the body data returned to be an array of repos
            let repos = body.map( ((repo:any) => new Repo(repo)) ) // no semi-colon ?      // Map each instance to each element of the array
            // Call back
            cb(repos);
        });
    }
}