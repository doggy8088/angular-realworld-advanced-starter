import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  post: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.post = this.fb.group({
      title: this.fb.control('', {
        validators: [Validators.required]
      }),
      body: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(10)]
      }),
      tags: this.fb.array([
        this.fb.control('Angular'),
        this.fb.control('HTML'),
        this.fb.control('CSS'),
      ])
    });
  }

  get tags(): FormArray {
    return this.post.get('tags') as FormArray;
  }

  addTag(tag) {
    if (tag) {
      this.tags.push(this.fb.control(tag));
    }
  }

  createPost() {
    if (this.post.valid) {
      this.http.post('http://localhost:3000/api/articles', {
        article: this.post.value
      }).subscribe(() => {
        alert('已成功建立文章!');
      }, (error) => {
        alert(JSON.stringify(error));
      });
    }
  }

}
