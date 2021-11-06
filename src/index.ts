// Main Index TypeScript file
/*
    This mini project which directly from a Tutorial, is used to return the Git Hub data from a User Name passed in to their Rest API
    Eg : https://www.youtube.com/watch?v=YPShu0H3RbM&list=PLqq-6Pq4lTTanfgsbnFzfWUhhAz3tIezU&index=2
    Accessed from Sonata LMS
*/

import {GithubApiService} from './GithubApiService'
import {User} from './User'
import {Repo} from './Repo'

import * as _ from 'lodash';                // For array manipulation
import * as process from 'process';         // To get the command line parameters

// Object to run the Git Hub API
let svc = new GithubApiService();
// Text typed into the Command Line
// The 3rd entry should be the GitHub username
if (process.argv.length < 3) {
    console.log('Please pass the username as an argument. Eg \'npm start <username>\'');
} else {
    let username :string = process.argv[2];
            //'koushikkothagal' // ****** GitHub username of the guy who made the tutorial, for testing
    // Retrieve the GitHub user data from the API for this User Name
    svc.getUserInfo(username, (user : User) => {
        // If user data is returned
            // ****** Ideally need to check the Status Code (eg return an error if not 200)
        if (user.login != undefined) {
            // Retrieve the Git Hub Repo data for this user
            // This gets returned as an Array
            svc.getRepos(username, (repos : Repo[]) => {
                // Sort by number of Forks descending
                let sortedRepos = _.sortBy(repos, [(repo:Repo) => repo.forksCount * -1]); // Descending
                // Use the top 5 only
                user.repos = _.take(sortedRepos, 5);
                
                // Final output - just a console print line
                console.log(user);

                // If none found
                if (user.repos.length == 0) {
                    console.log("No active/public Repos found for user : " + username);
                }
            });
        // If no value login string found for the username
        } else {
            console.log("No Git Hub login data is returned for user : " + username);
        }
    });
}