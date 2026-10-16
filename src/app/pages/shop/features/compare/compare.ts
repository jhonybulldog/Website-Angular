import { Component, inject } from '@angular/core';
import { CompareService } from '../../service/compare-service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [AsyncPipe, RouterLink],
  selector: 'app-compare',
  styleUrl: './compare.css',
  templateUrl: './compare.html',
})
export class Compare {
  private compareSer = inject(CompareService);
  
  products$ = this.compareSer.products$
}
