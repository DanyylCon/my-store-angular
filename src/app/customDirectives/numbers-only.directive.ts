import { Directive, HostListener, ElementRef } from '@angular/core';


// All credit for this code goes to Changhui Xu
//and the blog post they have written at https://codeburst.io/digit-only-directive-in-angular-3db8a94d80c3

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  inputElement: HTMLInputElement;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  constructor(public el: ElementRef) { 
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
      if (
        // Allow: Delete, Backspace, Tab, Escape, Enter, etc
        this.navigationKeys.indexOf(e.key) > -1 || 
        (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
        (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
        (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
        (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
        (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
        (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
        (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
        (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
      ) {
        return;  // let it happen, don't do anything
      }
      // Ensure that it is a number and stop the keypress
      if (e.key === ' ' || isNaN(Number(e.key))) {
        e.preventDefault();
      }
  }

  @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
      event.preventDefault();
      const pastedInput: string = (event.clipboardData as DataTransfer)
        .getData('text/plain')
        .replace(/\D/g, ''); // get a digit-only string
      document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
      event.preventDefault();
      const textData = (event.dataTransfer as DataTransfer)
        .getData('text').replace(/\D/g, '');
      this.inputElement.focus();
      document.execCommand('insertText', false, textData);
  }
}