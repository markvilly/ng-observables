import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop'
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal<number>(0)
  clickCount$ = toObservable(this.clickCount)
  private destroyRef = inject(DestroyRef)

  constructor(){
   
  }

  ngOnInit(): void {
    const subscription = this.clickCount$.subscribe({
      next:(value)=>{ console.log(`The bling vling is: ${value}`)}
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
  
  }

  onClick(){
    this.clickCount.update((prevCount) => prevCount + 1)
  }

}
