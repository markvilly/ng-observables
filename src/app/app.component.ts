import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal<number>(0)
  private destroyRef = inject(DestroyRef)
  ngOnInit(): void {
    const subscription = interval(13000).pipe(
      map((val)=> val * 2)
    ).subscribe({
      next: (value)=> console.group(value)
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
  }

  onClick(){
    this.clickCount.update((count)=> count + 1)}

}
