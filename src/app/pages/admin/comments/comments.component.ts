import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments;

  constructor(commentService: CommentService) {
    commentService.getAllComments(res => {
      this.comments = res;
    });

    // console.log("comm", this.comments);

    // commentService.insertComment("Bizim Brandimiz Cok iyi Branddir. Sizin Brandi de begendim. Bu yuzden yorum yaziyorum", cb => {
    //   console.log("CB", cb);
    // })

  }

  ngOnInit(): void {
  }

  convertDateString(strDate) {
    return new Date(strDate).toLocaleString('en-GB').slice(0, -3);
  }

}
