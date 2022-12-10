import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import Language from "../models/Language";
import {SpeedialComponent} from "../speedial/speedial.component";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  languages: Language[] = [];
  language: Language;
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.selectedLanguage();
    this.setLanguages();
  }

  setLanguages(){
    this.languages = [];
    this.translate.getLangs().forEach(lang =>{
      this.translate.get(lang).subscribe(translation =>{
        this.languages.push({name: translation, code: lang})
      })
    })
  }

  selectedLanguage(){
    this.translate.get(this.translate.currentLang).subscribe(translation =>{
      this.language = {name: translation, code: this.translate.currentLang}
    });
  }

  onChangeLanguage(code: string){
    this.translate.use(code);
    this.setLanguages();
    setTimeout(() => this.selectedLanguage(),100)
  }
}
