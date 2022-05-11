import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Components are the most basic UI building block of an Angular app. 
//An Angular app contains a tree of Angular components
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
  //Cascading Style Sheets is a style sheet language used for 
  //describing the presentation of a document written in a markup 
  //language such as HTML
})
export class MainComponent implements OnInit {

  //private http: HttpClient and HttpClient is a 
  //built-in service class available in the @angular
  constructor(private http: HttpClient) { }


  source: String = "";

  
  target: String = "";

  
  taken: Boolean = false;

  
  interpret:String;

  
  samples: any;

  
  illustration: any;

  
  opposite: any;

  
  same: any;

  
  Data: any;

  
  sentence: String = "";

  
  value_selected: String = "";

  
  responce: Map<string, any>;

  langArray: any = [];
  //An application programming interface (API) key is a 
  //code used to identify and authenticate an application or user
  key = "dict.1.1.20220510T200804Z.5dfc8b750d6442b0.a594ca517ae55abf290383b99d621dc6866c3b5d";
  saurusKey = "VYKZqwt0Os2GE9Rmgf4z"
  //OnInit is a life cycle widget called Angular to show that Angular is made to create a component
  ngOnInit(): void {
    this.getting_the_languages()
      .subscribe(data => {
        this.langArray = data;
        
      });
  }

  getting_the_languages() {
    //gets the language from the below mentioned
    //GET is an HTTP method for requesting data from the server. 
    //Requests using the HTTP GET method should only fetch data, 
    //cannot enclose data in the body of a GET message, and should not have any other effect on data on the server
    return this.http.get(`https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.key}`);
  }
//collecting the data for use in the answering of the questions
//help decision-making, or information
  getting_the_Data() {
    if (this.value_selected != "" && this.value_selected != "--Please choose the Target Language--" && this.sentence != "") {
      this.source = this.value_selected.substring(0,2);
      this.target = this.value_selected.substring(3,5);
      this.taken = true;
      //Requests using the HTTP GET method should only fetch data, 
      return this.http.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${this.key}&lang=${this.value_selected}&text=${this.sentence}`)
      .subscribe(details => {
        this.Data = details;
        this.samples = this.Data.def[0].tr[0].ex;
        this.same = this.Data.def[0].tr[0].syn;
        this.illustration = this.Data.def[0].tr[0].mean;
        this.interpret = this.Data.def[0].tr[0].text;
       
        console.log(this.Data.def[0].tr[0].syn);
      });
    }
  }
  

}
