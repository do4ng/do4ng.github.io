import { GetStaticPropsContext } from 'next';
import { compileMdx } from '../../mdx/compile';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Content } from '../../mdx/content';

interface RepoType {
  full_name: string;
  html_url: string;
  description?: string;
  stargazers_count: number;
  language: string;
  homepage?: string;
  fork: boolean;
}

export default function Repos({ repos, compiled }: { repos: RepoType[]; compiled: any }) {
  return (
    <>
      <h1 style={{ marginTop: '125px', paddingLeft: '10px' }}>Projects</h1>
      <div className="hello">
        <p className="title">/0-hello.mdx</p>
        <Content content={compiled}></Content>
      </div>
      <div className="repos">
        {repos.map((repo) => (
          <>
            <div className="repo">
              <h3>
                <a href={repo.html_url}>{repo.full_name}</a>
              </h3>
              <p>{repo.description || 'No description'}</p>
              <div className="info">
                <div className="star">
                  <i className="ri-star-line"></i>
                  <p>{repo.stargazers_count}</p>
                </div>
                <div className={`language ${`language-${repo.language.toLowerCase()}`}`}>
                  {repo.language}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
