import styled from "styled-components";

export const Container = styled.div`
  &.form-filter-component{
    position: relative;
    .filter-items-count{
      position: absolute;
      top: 0.10rem;
      right: 0.25rem;
      font-size: 0.75rem;
    }
    .checkbox-container{
      height: 140px;
      max-width: 100%;
      overflow-y: scroll;

      .empty-filter, .loading-state{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        svg{
          scale: 1.5;
          fill: #454545;
        }
      }

      .loading-state{
        .loading-image {
          animation: rotate 1s linear infinite;
        }
      }
    }
    
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    } 
  }
`;