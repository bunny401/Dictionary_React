import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  //private http: HttpClient
  constructor(private http: HttpClient) { }

  sourceLang: String = "";
  targetLang: String = "";
  fetched: Boolean = false;
  translation:String;
  examples: any;
  meanings: any;
  antonyms: any;
  synonyms: any;
  dataObj: any;
  word: String = "";
  selectedValue: String = "";
  answer: Map<string, any>;
  langArray: any = [];
  key = "dict.1.1.20210422T125434Z.f4d015a3af63d67f.4f0b3d9893531321e4865a671e27ec32ae85b49b";
  saurusKey = "VYKZqwt0Os2GE9Rmgf4z"
  ngOnInit(): void {
    this.getlanguages()
      .subscribe(data => {
        this.langArray = data;
        //this.langArray = this.langArray.filter(lan => lan.startsWith("en"))
        //console.log(this.langArray[0]);
      });
  }

  getlanguages() {
    return this.http.get(`https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${this.key}`);
  }

  getData() {
    if (this.selectedValue != "" && this.selectedValue != "--Please choose the Target Language--" && this.word != "") {
      this.sourceLang = this.selectedValue.substring(0,2);
      this.targetLang = this.selectedValue.substring(3,5);
      this.fetched = true;
      return this.http.get(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${this.key}&lang=${this.selectedValue}&text=${this.word}`)
      .subscribe(data => {
        this.dataObj = data;
        this.synonyms = this.dataObj.def[0].tr[0].syn;
        this.meanings = this.dataObj.def[0].tr[0].mean;
        this.translation = this.dataObj.def[0].tr[0].text;
        this.examples = this.dataObj.def[0].tr[0].ex;
        console.log(this.dataObj.def[0].tr[0].syn);
      });
    }
  }
  

}
