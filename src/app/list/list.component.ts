import { PageService } from './../page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private service: PageService) { }

  articles:any;

  ngOnInit() {
    this.service.done.subscribe(res=>{
      this.articles = res.content.articles;
      console.log(this.articles);
    })
  }

}
