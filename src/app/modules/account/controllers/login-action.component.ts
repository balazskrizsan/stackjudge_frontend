import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component(
  {
    template: '',
    styleUrls: [],
    providers: [],
  }
)
export class LoginActionComponent implements OnInit{
  public constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params.jwt);
    });
  }
}
