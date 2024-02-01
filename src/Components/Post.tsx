import { format , formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Avatar } from './Avatar';
import { Comment } from './Comentario';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent,  InvalidEvent, KeyboardEvent, useState } from 'react';

// author: {avtar_url: '', name: "", rule: ""};
// publishedAt: date;
// content: string;

interface Author{
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content{
  type: "paragraph" | "link";
  content: string;
}


export interface PostType{
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps{
  post: PostType;
}

export interface CommentProps{
  id: string
  content: string
}


export function Post ({ post }: PostProps){

  const [comments, setComments] = useState<CommentProps[]>([])
  

  const [newCommentText, setNewCommentText] = useState('')

  function handleCreateNewComment(event: FormEvent){
    event.preventDefault();

      // const randomId = new Date() + crypto.randomUUID()
      const newComment = {
          id: crypto.randomUUID(),
          content: newCommentText,  
      }
   
    setComments((comment)=> [...comment, newComment]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
    
  }

  const publishedDateFormat = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function randleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse compo é obrigatório!')
    
  }

  function deleteComment(deleteById:string){

    const deleteSelectComment = comments.filter((comment) => comment.id !== deleteById)
 
    setComments(deleteSelectComment)
  
  }


  function handleEnterKey (event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey ) {
      event.preventDefault();
      handleCreateNewComment(event);
    }
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return(
    <article className={styles.post}>
      
      <header>
        <div className={styles.author}>
          <Avatar             
            src={post.author.avatarUrl}
          />
          <div className={styles.authorInfo}> 
            <strong> {post.author.name}</strong>
            <span> {post.author.role} </span>
          </div>
        </div>

        <time title={publishedDateFormat} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line =>{
          if (line.type === 'paragraph'){
            return(
              <p key={line.content}>{line.content}</p>
            );
          }else if (line.type === 'link'){
            return(
              <p key={line.content}><a href="">{line.content}</a></p>
            );
          }
        })}
      </div>  

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name='comment'
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={randleNewCommentInvalid}
          onKeyDown={handleEnterKey}
          required
        />
        <footer>
          <button 
            type='submit' 
            disabled={isNewCommentEmpty}> Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment =>{
          return(
            <Comment
              key={comment.id}
              id={comment.id}
              content={comment.content}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
      
    </article>
  )
}