import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function LazyMount({ 
  children, 
  minHeight = "400px",
  margin = "400px"
}: { 
  children: React.ReactNode, 
  minHeight?: string,
  margin?: string
}) {
  const ref = useRef<HTMLDivElement>(null);
  // O componente dispara 400px ANTES de entrar na tela, e apenas uma vez (once: true)
  const isInView = useInView(ref, { margin: margin as any, once: true });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasMounted(true);
    }
  }, [isInView]);

  return (
    <div ref={ref} style={{ minHeight: hasMounted ? 'auto' : minHeight, width: '100%' }}>
      {hasMounted ? children : null}
    </div>
  );
}
