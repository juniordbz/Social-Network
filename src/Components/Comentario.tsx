import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Comentario.module.css';
import { Trash, ThumbsUp } from 'phosphor-react';

interface CommentProps{
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({content, onDeleteComment}: CommentProps){
  
const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content)
  }

  function handleLikeComment(){
    setLikeCount(likeCount+1);
  }

  return(
    <div className={styles.comment}>
      <Avatar 
        hasBorder={false}
        src="https://github.com/juniordbz.png" 
        alt="img perfil comentário" 
      />
      
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Francico Junior</strong>
              <time title='27/11/2023' dateTime='2023-11-27 07:58:00'>Cerca de 1 hora atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash
              size={24}
              />
            </button>

          </header>

          <p> {content} </p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp/>
            {}
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>

    </div>
  ) 
}