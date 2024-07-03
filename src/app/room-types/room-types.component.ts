import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.scss']
})
export class RoomTypesComponent implements OnInit {

  constructor( private router: Router,
    ) { }

  ngOnInit(): void {
  }
  roomTypesList: any[] = [
    {
      type: "BUILD PREMIUM",
      src: "./assets/room/room14.jpg",
      isSelected: false,
      person: "2",
      size: "180 sqm",
      bed: "King",
      tvSize: "55″ Smart TV",
      price: "2630",
      description: "Enjoy a luxurious escape in our Build Premium room, designed for comfort and relaxation. Featuring a spacious layout with stunning sea views from a large balcony."
    },
    {
      type: "PREMIUM WOOD", 
      src: "./assets/room/room2.jpg",
      isSelected: false,
      person: "2",
      size: "100 sqm",
      bed: "Queen/ 2 Singles",
      tvSize: "55″ Smart TV",
      price: "2010",
      description: "Indulge in the ultimate sleep experience in our Premium Wood room, furnished with contemporary designs and modern amenities for a memorable stay."
    },
    {
      type: "DELUXE STYLE", 
      src: "./assets/room/cosy.jpg",
      isSelected: false,
      person: "2",
      size: "62 sqm",
      bed: "Queen/ 2 Singles",
      tvSize: "32″ Smart TV",
      price: "620",
      description: "Experience stylish comfort in our Deluxe Style room, featuring chic and modern interiors designed to enhance your relaxation and comfort."
    },
    {
      type: "SIMPLE GREY", 
      src: "./assets/room/room8.jpg",
      isSelected: false,
      person: "2",
      size: "35 sqm",
      bed: "Queen/ 2 Singles",
      tvSize: "32″ Smart TV",
      price: "470",
      description: "Our Simple Grey rooms offer a cozy and homely atmosphere with spacious design and essential amenities, perfect for a comfortable stay away from home."
    },
    {
      type: "DELUXE VINTAGE", 
      src: "./assets/room/room9.jpg",
      isSelected: false,
      person: "2",
      size: "60 sqm",
      bed: "Queen/ 2 Singles",
      tvSize: "32″ Smart TV",
      price: "520",
      description: "Step into a blend of elegance and comfort with our Deluxe Vintage rooms, featuring vintage-inspired decor and modern amenities for a unique accommodation experience."
    },
    {
      type: "DELUXE GREY", 
      src: "./assets/room/room15.jpg",
      isSelected: false,
      person: "2",
      size: "52 sqm",
      bed: "Queen/ 2 Singles",
      tvSize: "32″ Smart TV",
      price: "570",
      description: "Discover relaxation in our Deluxe Grey rooms, offering a serene ambiance with spacious interiors and essential amenities for a soothing stay."
    },
    {
      type: "SIMPLE GREY", 
      src: "./assets/room/room10.jpg",
      isSelected: false,
      person: "2",
      size: "35 sqm",
      bed: "Queen/ 2 Singles",
      tvSize: "32″ Smart TV",
      price: "575",
      description: "Our Simple Grey rooms provide a comfortable and minimalist setting with essential amenities, ideal for a relaxing stay with modern comforts."
    },
    {
      type: "SIMPLE STYLISH", 
      src: "./assets/room/room11.jpg",
      isSelected: false,
      person: "2",
      size: "48 sqm",
      bed: "Queen",
      tvSize: "32″ Smart TV",
      price: "980",
      description: "Enjoy contemporary elegance in our Simple Stylish rooms, designed with stylish furnishings and essential amenities for a sophisticated accommodation experience."
    },
    {
      type: "DELUXE BLACK", 
      src: "./assets/room/room12.jpg",
      isSelected: false,
      person: "2",
      size: "58 sqm",
      bed: "Queen",
      tvSize: "32″ Smart TV",
      price: "1070",
      description: "Escape into luxury with our Deluxe Black rooms, featuring refined decor and essential amenities for a luxurious and comfortable stay."
    },
    {
      type: "SIMPLE WOOD", 
      src: "./assets/room/room13.jpg",
      isSelected: false,
      person: "2",
      size: "40 sqm",
      bed: "2 Singles",
      tvSize: "32″ Smart TV",
      price: "520",
      description: "Experience natural elegance in our Simple Wood rooms, designed with warm wooden accents and essential amenities for a cozy and inviting accommodation."
    }
  ];



  navToBook(){
    this.router.navigate(['/bookaroom']);
  }

}
