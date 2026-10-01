import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Menu, MenuItem, Tooltip, Drawer, Fade, GlobalStyles } from '@mui/material';
import {
    ArrowBackIosNew as PrevIcon,
    ArrowForwardIos as NextIcon,
    Home as HomeIcon,
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    LibraryBooks as PitchIcon,
    VolumeUp as VolumeOnIcon,
    VolumeOff as VolumeOffIcon,
    ViewList as ListIcon,
    KeyboardArrowUp as UpIcon,
    KeyboardArrowDown as DownIcon,
    Delete as DeleteIcon,
    Fullscreen as FullscreenIcon,
    FullscreenExit as FullscreenExitIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { PITCHES, Slide } from '../data/pitches';
import '../styles/site-v2.css';
import '../styles/pages/pitch-bancolombia.css';

// Los temas del dato original (negro, amarillo, neón) se traducen al lenguaje v2:
// lienzo o papel. El amarillo del cliente queda solo como una línea mínima.
const PAPER_THEMES = ['WHITE_MINIMAL', 'GRAY_MODERN', 'BLACK_MODERN', 'SUPER_AI_NEON'];

const PitchBancolombia: React.FC = () => {
    const navigate = useNavigate();

    // State for Pitch Data
    const [selectedPitchId, setSelectedPitchId] = useState<'bancolombia' | 'corona'>('bancolombia');
    const [slides, setSlides] = useState<Slide[]>(() => {
        const saved = localStorage.getItem(`pitch_slides_v11_${selectedPitchId}`);
        return saved ? JSON.parse(saved) : PITCHES[selectedPitchId].slides;
    });

    // Presentation State
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [isFocusMode, setIsFocusMode] = useState(false);

    // Edit Mode State
    const [isEditMode, setIsEditMode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const current = slides[currentSlideIndex] || slides[0];

    // Toggle Fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // Listen for fullscreen changes (e.g. Esc key)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Effect to auto-unmute on Visual Showcase
    useEffect(() => {
        if (current.title === 'Visual Showcase') {
            setIsMuted(false);
        } else {
            setIsMuted(true);
        }
    }, [current.title]);

    // Persist slides change
    useEffect(() => {
        localStorage.setItem(`pitch_slides_v11_${selectedPitchId}`, JSON.stringify(slides));
    }, [slides, selectedPitchId]);

    // Reset focus mode on slide change
    useEffect(() => {
        setIsFocusMode(false);
    }, [currentSlideIndex]);

    // Sync slides when selectedPitchId changes
    useEffect(() => {
        const saved = localStorage.getItem(`pitch_slides_v11_${selectedPitchId}`);
        setSlides(saved ? JSON.parse(saved) : PITCHES[selectedPitchId].slides);
        setCurrentSlideIndex(0);
    }, [selectedPitchId]);

    const moveSlide = (index: number, direction: 'up' | 'down') => {
        const newSlides = [...slides];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < slides.length) {
            const [movedSlide] = newSlides.splice(index, 1);
            newSlides.splice(newIndex, 0, movedSlide);
            setSlides(newSlides);

            // Maintain focus on the same slide content
            if (currentSlideIndex === index) {
                setCurrentSlideIndex(newIndex);
            } else if (currentSlideIndex === newIndex) {
                setCurrentSlideIndex(index);
            }
        }
    };

    const deleteSlide = (index: number) => {
        if (slides.length <= 1) return;
        const newSlides = [...slides];
        newSlides.splice(index, 1);
        setSlides(newSlides);
        
        // Adjust current index to stay on a valid slide
        if (currentSlideIndex === index) {
            setCurrentSlideIndex(Math.min(index, newSlides.length - 1));
        } else if (currentSlideIndex > index) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const nextSlide = useCallback(() => {
        if (!slides.length) return;
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        if (!slides.length) return;
        setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isEditMode || isOrganizerOpen) return; // Disable keys while editing or organizing
            if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') {
                if (isOrganizerOpen) setIsOrganizerOpen(false);
                else navigate(ROUTES.HOME);
            }
            if (e.key === 'f') setIsFocusMode(prev => !prev);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, navigate, isEditMode, isOrganizerOpen]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isPaused && !isEditMode && !isFocusMode && !isOrganizerOpen) {
            timer = setInterval(nextSlide, 8000);
        }
        return () => clearInterval(timer);
    }, [isPaused, nextSlide, isEditMode, isFocusMode, isOrganizerOpen]);

    const handlePitchChange = (id: 'bancolombia' | 'corona') => {
        setSelectedPitchId(id);
        setAnchorEl(null);
        // Load from localStorage or defaults
        const saved = localStorage.getItem(`pitch_slides_${id}`);
        setSlides(saved ? JSON.parse(saved) : PITCHES[id].slides);
        setCurrentSlideIndex(0);
    };

    const restoreDefaults = () => {
        if (window.confirm('¿Estás seguro de que quieres restaurar el orden original de este pitch?')) {
            const defaultSlides = PITCHES[selectedPitchId].slides;
            setSlides(defaultSlides);
            setCurrentSlideIndex(0);
            localStorage.removeItem(`pitch_slides_${selectedPitchId}`);
        }
    };

    const handleTextChange = (field: keyof Slide, value: string | string[], index: number = -1) => {
        const newSlides = [...slides];
        if (index !== -1 && Array.isArray(newSlides[currentSlideIndex].content)) {
            const newContent = [...(newSlides[currentSlideIndex].content as string[])];
            newContent[index] = value as string;
            newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], content: newContent };
        } else {
            newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], [field]: value };
        }
        setSlides(newSlides);
    };

    const progress = ((currentSlideIndex + 1) / slides.length) * 100;
    const isTitleOnly = current.content === '';
    const isPaper = PAPER_THEMES.includes(current.theme);
    const isClientBrand = current.theme === 'BANCOLOMBIA_PRIMARY';
    const hasMedia = Boolean((current.image || current.video) && (current.imageLayout === 'side' || current.imageLayout === 'background'));
    const isBackgroundVideo = Boolean(current.video && current.imageLayout === 'background');
    const mediaFull = isBackgroundVideo && isFocusMode;
    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        <div className={`a4 a4-page a4-pitch${isFocusMode ? ' is-focus' : ''}`}>
            <GlobalStyles styles={{ body: { overflow: 'hidden' } }} />

            <div className="a4-pitch-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Progreso del pitch">
                <i style={{ width: `${progress}%` }} />
            </div>

            <div
                className={`a4-pitch-stage${isPaper ? ' paper' : ''}${isBackgroundVideo ? ' clickable' : ''}`}
                onClick={() => {
                    if (isBackgroundVideo) setIsFocusMode(!isFocusMode);
                }}
            >
                <span className="a4-pitch-idx a4-cap a4-num" aria-hidden="true">
                    {pad(currentSlideIndex + 1)} / {pad(slides.length)}
                </span>

                <div className={`a4-pitch-body a4-wrap${hasMedia ? ' has-media' : ''}`}>
                    <Fade in={!isFocusMode} timeout={600} key={`${selectedPitchId}-${currentSlideIndex}-${current.title}`}>
                        <div className={`a4-pitch-text${isTitleOnly ? ' center' : ''}`}>
                            {current.category && (
                                <p className={`a4-cap${isClientBrand ? ' a4-pitch-mark' : ''}`}>{current.category.replace(/([a-záéíóú])([A-Z])/g, '$1 $2')}</p>
                            )}

                            {isEditMode ? (
                                <textarea
                                    className="a4-pitch-edit title"
                                    aria-label="Título"
                                    rows={2}
                                    value={current.title}
                                    onChange={(e) => handleTextChange('title', e.target.value)}
                                />
                            ) : (
                                <h1 className={`a4-pitch-title${isTitleOnly ? ' big' : ''}`}>{current.title}</h1>
                            )}

                            {isTitleOnly && current.subtitle && (
                                isEditMode ? (
                                    <input
                                        className="a4-pitch-edit"
                                        aria-label="Subtítulo"
                                        value={current.subtitle}
                                        onChange={(e) => handleTextChange('subtitle', e.target.value)}
                                    />
                                ) : (
                                    <p className="a4-cap" style={{ fontSize: 15 }}>{current.subtitle}</p>
                                )
                            )}

                            {!isTitleOnly && (
                                <div className="a4-pitch-split">
                                    <div>
                                        {isEditMode ? (
                                            <textarea
                                                className="a4-pitch-edit"
                                                aria-label="Subtítulo"
                                                rows={2}
                                                value={current.subtitle || ''}
                                                onChange={(e) => handleTextChange('subtitle', e.target.value)}
                                            />
                                        ) : current.subtitle && (
                                            <h2 className="a4-pitch-sub">{current.subtitle}</h2>
                                        )}
                                    </div>

                                    <div>
                                        {Array.isArray(current.content) ? (
                                            <div className="a4-pitch-lines">
                                                {current.content.map((line, i) => (
                                                    <div key={i}>
                                                        <span className="a4-cap a4-num">{pad(i + 1)}</span>
                                                        {isEditMode ? (
                                                            <textarea
                                                                className="a4-pitch-edit"
                                                                aria-label={`Línea ${i + 1}`}
                                                                rows={2}
                                                                value={line}
                                                                onChange={(e) => handleTextChange('content', e.target.value, i)}
                                                            />
                                                        ) : (
                                                            <span>{line}</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : isEditMode ? (
                                            <textarea
                                                className="a4-pitch-edit"
                                                aria-label="Contenido"
                                                rows={4}
                                                value={current.content}
                                                onChange={(e) => handleTextChange('content', e.target.value)}
                                            />
                                        ) : (
                                            <p className="a4-pitch-lead">{current.content}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Fade>

                    {hasMedia && (
                        <div className={`a4-pitch-media${mediaFull ? ' is-full' : ''}`}>
                            {current.video ? (
                                <>
                                    <video
                                        autoPlay
                                        muted={isMuted}
                                        loop
                                        playsInline
                                        src={current.video}
                                    />
                                    {!mediaFull && (
                                        <button
                                            type="button"
                                            className="a4-pitch-mute"
                                            aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                                            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                                        >
                                            {isMuted ? <VolumeOffIcon fontSize="small" /> : <VolumeOnIcon fontSize="small" />}
                                        </button>
                                    )}
                                </>
                            ) : (
                                <img src={current.image} alt="" />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="a4-pitch-controls">
                <div>
                    <Tooltip title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}>
                        <button type="button" className="a4-pitch-btn" aria-label="Pantalla completa" onClick={toggleFullscreen}>
                            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </button>
                    </Tooltip>
                    <Tooltip title="Cambiar pitch">
                        <button type="button" className="a4-pitch-btn" aria-label="Cambiar pitch" onClick={(e) => setAnchorEl(e.currentTarget)}>
                            <PitchIcon />
                        </button>
                    </Tooltip>
                    <Tooltip title="Organizar diapositivas">
                        <button type="button" className={`a4-pitch-btn${isOrganizerOpen ? ' on' : ''}`} aria-label="Organizar diapositivas" onClick={() => setIsOrganizerOpen(true)}>
                            <ListIcon />
                        </button>
                    </Tooltip>
                    <Tooltip title={isEditMode ? 'Guardar cambios' : 'Editar pitch'}>
                        <button type="button" className={`a4-pitch-btn${isEditMode ? ' on' : ''}`} aria-label={isEditMode ? 'Guardar cambios' : 'Editar pitch'} onClick={() => setIsEditMode(!isEditMode)}>
                            {isEditMode ? <SaveIcon /> : <EditIcon />}
                        </button>
                    </Tooltip>
                </div>
                <div>
                    <button type="button" className="a4-pitch-btn" aria-label="Diapositiva anterior" onClick={prevSlide}><PrevIcon /></button>
                    <button type="button" className={`a4-pitch-btn${isPaused ? '' : ' on'}`} aria-label={isPaused ? 'Reproducir' : 'Pausar'} onClick={() => setIsPaused(!isPaused)}>
                        {isPaused ? <PlayIcon /> : <PauseIcon />}
                    </button>
                    <button type="button" className="a4-pitch-btn" aria-label="Diapositiva siguiente" onClick={nextSlide}><NextIcon /></button>
                    <span className="a4-cap a4-num" style={{ minWidth: 56, textAlign: 'center' }}>{currentSlideIndex + 1}/{slides.length}</span>
                    <button type="button" className="a4-pitch-btn" aria-label="Ir al inicio" onClick={() => navigate(ROUTES.HOME)}><HomeIcon /></button>
                </div>
            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: '#ffffff',
                            color: '#171717',
                            border: '1px solid #171717',
                            borderRadius: 0,
                            boxShadow: 'none',
                            minWidth: 200
                        }
                    }
                }}
            >
                <MenuItem sx={{ minHeight: 44 }} onClick={() => handlePitchChange('bancolombia')}>Bancolombia</MenuItem>
                <MenuItem sx={{ minHeight: 44 }} onClick={() => handlePitchChange('corona')}>Alimentos Corona</MenuItem>
            </Menu>

            <Drawer
                anchor="left"
                open={isOrganizerOpen}
                onClose={() => setIsOrganizerOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: { xs: '100%', sm: 380 },
                            maxWidth: '100%',
                            bgcolor: '#ffffff',
                            color: '#171717',
                            borderRight: '1px solid #171717',
                            borderRadius: 0,
                            boxShadow: 'none'
                        }
                    }
                }}
            >
                <div className="a4-pitch-org">
                    <div className="a4-pitch-org-head">
                        <p className="a4-cap">Organizador</p>
                        <button type="button" className="a4-pitch-btn" aria-label="Cerrar organizador" onClick={() => setIsOrganizerOpen(false)}>
                            <PrevIcon />
                        </button>
                    </div>

                    <div className="a4-pitch-org-list">
                        {slides.map((slide, index) => (
                            <div
                                key={`${selectedPitchId}-${index}-${slide.title}`}
                                className={`a4-pitch-org-item${currentSlideIndex === index ? ' on' : ''}`}
                                onClick={() => {
                                    setCurrentSlideIndex(index);
                                    if (window.innerWidth < 600) setIsOrganizerOpen(false);
                                }}
                            >
                                <div>
                                    <Typography variant="body2" noWrap sx={{ fontWeight: 500, color: '#171717' }}>
                                        {index + 1}. {slide.title}
                                    </Typography>
                                    <p className="a4-cap" style={{ color: '#555' }}>
                                        {slide.type} · {slide.theme.replace(/_/g, ' ').toLowerCase()}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="a4-pitch-btn"
                                    aria-label="Subir diapositiva"
                                    disabled={index === 0}
                                    onClick={(e) => { e.stopPropagation(); moveSlide(index, 'up'); }}
                                >
                                    <UpIcon />
                                </button>
                                <button
                                    type="button"
                                    className="a4-pitch-btn"
                                    aria-label="Bajar diapositiva"
                                    disabled={index === slides.length - 1}
                                    onClick={(e) => { e.stopPropagation(); moveSlide(index, 'down'); }}
                                >
                                    <DownIcon />
                                </button>
                                <button
                                    type="button"
                                    className="a4-pitch-btn"
                                    aria-label="Eliminar diapositiva"
                                    onClick={(e) => { e.stopPropagation(); deleteSlide(index); }}
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="a4-pitch-org-foot">
                        <button type="button" className="a4-ghost" onClick={restoreDefaults}>
                            Restaurar orden original →
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default PitchBancolombia;
