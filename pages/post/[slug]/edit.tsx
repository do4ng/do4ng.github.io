import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Code from '@tiptap/extension-code';
import HardBreak from '@tiptap/extension-hard-break';
import { useRouter } from '$exta-router';
import { Markdown } from '@tiptap/markdown';

export default function EditPost({ params }) {
  const { slug } = params;
  const router = useRouter();

  const [meta, setMeta] = useState({
    title: '',
    date: '',
    description: '',
    tags: '',
    image: null,
  });

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
      }),
      Markdown,
      Code,
      HardBreak.configure({
        HTMLAttributes: {
          class: 'line-break',
        },
      }),
    ],
    content: null,
    contentType: 'markdown',
    onUpdate({ editor }) {
      setContent(editor.getMarkdown());
    },
  });

  useEffect(() => {
    if (!slug) return;

    fetch(`/apis/post?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then(({ meta, content }) => {
        setMeta({
          title: meta.title,
          date: meta.date,
          image: meta.image,
          description: meta.description,
          tags: meta.tags.join(','),
        });

        const next = content || '';
        setContent(next);
        console.log(JSON.stringify(content));
        editor.commands.setContent(content, {
          contentType: 'markdown',
        });
        setLoading(false);
      });
  }, [slug, editor]);

  const save = async () => {
    setSaving(true);
    setSaveMessage('');

    try {
      await fetch('/apis/post', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          meta: {
            name: meta.date,
            title: meta.title,
            date: meta.date,
            description: meta.description,
            image: meta.image,
            tags: meta.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean),
          },
          content,
        }),
      });
      setSaveMessage('Saved');
    } catch (error) {
      console.error(error);
      setSaveMessage('Save failed');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(''), 1800);
      window.location.href = `/post/${slug}/`;
    }
  };

  if (loading) {
    return (
      <div className="post-container">
        <div className="preface">
          <div className="title">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-container">
      <div className="preface">
        <div className="title">{meta.title || 'Untitled Post'}</div>
        <div className="post-items">
          <div className="name">editor</div>
          <div className="border"> • </div>
          <div className="date">{meta.date || 'date'}</div>
        </div>
      </div>

      <div className="post-layer">
        <div className="post">
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            <input
              value={meta.title}
              onChange={(e) => setMeta({ ...meta, title: e.target.value })}
              placeholder="title"
              style={{
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #d9d9d9',
              }}
            />
            <input
              value={meta.date}
              onChange={(e) => setMeta({ ...meta, date: e.target.value })}
              placeholder="date"
              style={{
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #d9d9d9',
              }}
            />
            <input
              value={meta.tags}
              onChange={(e) => setMeta({ ...meta, tags: e.target.value })}
              placeholder="tags (comma)"
              style={{
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #d9d9d9',
              }}
            />
            <textarea
              value={meta.description}
              onChange={(e) => setMeta({ ...meta, description: e.target.value })}
              placeholder="description"
              style={{
                minHeight: 90,
                padding: '12px 14px',
                borderRadius: 8,
                border: '1px solid #d9d9d9',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <h3>Editor</h3>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              <button onClick={() => editor?.chain().focus().toggleBold().run()}>
                Bold
              </button>
              <button onClick={() => editor?.chain().focus().toggleStrike().run()}>
                Strike
              </button>
              <button onClick={() => editor?.chain().focus().toggleCode().run()}>
                Code
              </button>
              <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
                Code Block
              </button>
            </div>

            <EditorContent
              editor={editor}
              style={{
                minHeight: 260,
                border: '1px solid #d9d9d9',
                borderRadius: 8,
                padding: 14,
              }}
            />
          </div>

          <div className="footer">
            <button
              onClick={save}
              disabled={saving}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid #bdbdbd',
                cursor: saving ? 'default' : 'pointer',
              }}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <div style={{ color: '#6a6a6a', fontSize: '0.9rem', paddingTop: 8 }}>
              {saveMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
