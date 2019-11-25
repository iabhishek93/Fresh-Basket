import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  imageUrl = '../../../assets/Images/404_not_found_image.png';

  constructor() { }

  ngOnInit() {
  }

}
