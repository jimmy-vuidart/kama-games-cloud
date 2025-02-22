import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

export enum Status {
  NORMAL,
  LOADING,
  INFO,
  SUCCESS,
  WARNING,
  DANGER
}

@Component({
  selector: 'badge',
  imports: [
    NgClass,
  ],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  selectedClass: string = '';
  private readonly COLORS: Record<Status, string> = {
    [Status.NORMAL]: 'text-gray-600 ring-gray-500/10',
    [Status.WARNING]: 'text-yellow-800 ring-yellow-600/20',
    [Status.DANGER]: 'text-red-700 ring-red-600/10',
    [Status.INFO]: 'text-blue-700 ring-blue-700/10',
    [Status.SUCCESS]: 'text-green-700 ring-green-600/20',
  };

  @Input() set status(val: Status) {
    this.selectedClass = this.COLORS[val];
  }
}
